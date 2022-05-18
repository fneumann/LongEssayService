<?php

namespace Edutiek\LongEssayService\Corrector;

use Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Base\BaseContext;
use Edutiek\LongEssayService\Data\CorrectionSummary;
use Edutiek\LongEssayService\Internal\Authentication;
use Edutiek\LongEssayService\Internal\Dependencies;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\StatusCode;

/**
 * Handler of REST requests from the corrector app
 */
class Rest extends Base\BaseRest
{
    /** @var Context  */
    protected $context;


    /**
     * Init server / add handlers
     * @param Context $context
     * @param Dependencies $dependencies
     */
    public function init(BaseContext $context, Dependencies $dependencies)
    {
        parent::init($context, $dependencies);
        $this->get('/data', [$this,'getData']);
        $this->get('/item/{key}', [$this,'getItem']);
        $this->get('/file/{key}', [$this,'getFile']);
        $this->put('/summary/{key}', [$this, 'putSummary']);
    }


    /**
     * GET the data for the correction task
     * @param Request  $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function getData(Request $request, Response $response, array $args): Response
    {
        // common checks and initializations
        if (!$this->prepare($request, $response, $args, Authentication::PURPOSE_DATA)) {
            return $this->response;
        }

        $task = $this->context->getCorrectionTask();

        $resources = [];
        foreach ($this->context->getResources() as $resource) {
            $resources[] = [
                'key' => $resource->getKey(),
                'title' => $resource->getTitle(),
                'type' => $resource->getType(),
                'source' => $resource->getSource(),
                'mimetype' => $resource->getMimetype(),
                'size' => $resource->getSize()
            ];
        }
        $levels = [];
        foreach ($this->context->getGradeLevels() as $level) {
            $levels[] = [
                'key' => $level->getKey(),
                'title' => $level->getTitle(),
                'min_points' => $level->getMinPoints()
            ];
        }
        $items = [];
        foreach ($this->context->getCorrectionItems() as $item) {
            $items[] = [
                'key' => $item->getKey(),
                'title' => $item->getTitle()
            ];
        }

        $json = [
            'task' => [
                'title' => $task->getTitle(),
                'instructions' => $task->getInstructions(),
                'correction_end' => $task->getCorrectionEnd()
            ],
            'resources' => $resources,
            'levels' => $levels,
            'items' => $items
        ];

        $this->setNewDataToken();
        $this->setNewFileToken();
        return $this->setResponse(StatusCode::HTTP_OK, $json);
    }


    /**
     * GET the data of a correction item
     * @param Request  $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function getItem(Request $request, Response $response, array $args): Response
    {
        // common checks and initializations
        if (!$this->prepare($request, $response, $args, Authentication::PURPOSE_DATA)) {
            return $this->response;
        }

        foreach ($this->context->getCorrectionItems() as $item) {

            if ($item->getKey() == $args['key']) {

                $essay = $this->context->getEssayOfItem($item->getKey());
                $correctors = [];
                $summaries = [];
                foreach ($this->context->getCorrectorsOfItem($item->getKey()) as $corrector) {
                    $correctors[$corrector->getKey()] = [
                        'key' => $corrector->getKey(),
                        'title' => $corrector->getTitle()
                    ];
                    $summary = $this->context->getCorrectionSummary($item->getKey(), $corrector->getKey());
                    $summaries[$corrector->getKey()] = [
                        'text' => $summary->getText(),
                        'points' => $summary->getPoints(),
                        'grade_key' => $summary->getGradeKey()
                    ];
                }
                if (!isset($correctors[$this->context->getUserKey()])) {
                    return $this->setResponse(StatusCode::HTTP_FORBIDDEN, 'current user is no corrector');
                }

                $json = [
                    'essay' => [
                        'text'=> $essay->getProcessedText(),
                        'started' => $essay->getEditStarted(),
                        'ended' => $essay->getEditEnded(),
                        'authorized' => $essay->isAuthorized()
                    ],
                    'correctors' => $correctors,        // indexed by corrector key
                    'summaries' => $summaries           // indexed by corrector key
                ];

                $this->setNewDataToken();
                return $this->setResponse(StatusCode::HTTP_OK, $json);
            }
        }

        return $this->setResponse(StatusCode::HTTP_NOT_FOUND, 'item not found');
    }


    /**
     * PUT the summary of a correction item
     * @param Request  $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function putSummary(Request $request, Response $response, array $args): Response
    {
        // common checks and initializations
        if (!$this->prepare($request, $response, $args, Authentication::PURPOSE_DATA)) {
            return $this->response;
        }
        $data = $this->request->getParsedBody();

        foreach ($this->context->getCorrectionItems() as $item) {
            if ($item->getKey() == $args['key']) {
                foreach ($this->context->getCorrectorsOfItem($item->getKey()) as $corrector) {
                    if ($corrector->getKey() == $this->context->getUserKey()) {

                        $summary = new CorrectionSummary(
                            isset($data['text']) ? (string) $data['text'] : null,
                            isset($data['points']) ? (int) $data['points'] : null,
                            isset($data['grade_key']) ? (string) $data['grade_key'] : null
                        );
                        $this->context->setCorrectionSummary($item->getKey(), $this->context->getUserKey(), $summary);
                        $this->setNewDataToken();
                        return $this->setResponse(StatusCode::HTTP_OK);
                    }
                }
                return $this->setResponse(StatusCode::HTTP_FORBIDDEN, 'current user is no corrector');
            }
        }
        return $this->setResponse(StatusCode::HTTP_NOT_FOUND, 'item not found');
    }

}