<?php

namespace Edutiek\LongEssayService\Writer;

use Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Base\BaseContext;
use Edutiek\LongEssayService\Data\WritingResource;
use Edutiek\LongEssayService\Data\WritingStep;
use Edutiek\LongEssayService\Internal\Authentication;
use Edutiek\LongEssayService\Internal\Dependencies;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\StatusCode;
use DiffMatchPatch\DiffMatchPatch;

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
        $this->get('/file/{key}', [$this,'getFile']);

        $this->put('/start', [$this,'putStart']);
        $this->put('/steps', [$this,'putSteps']);
    }


    /**
     * GET the settings
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

        $settings = $this->context->getWritingSettings();
        $task = $this->context->getWritingTask();
        $essay = $this->context->getWrittenEssay();

        $resources = [];
        foreach ($this->context->getWritingResources() as $resource) {
            $resources[] = [
                'key' => $resource->getKey(),
                'title' => $resource->getTitle(),
                'type' => $resource->getType(),
                'source' => $resource->getSource(),
                'mimetype' => $resource->getMimetype(),
                'size' => $resource->getSize()
            ];
        }

        $steps = [];
        // send all steps if undo should be based on them
        // then each step would need a revert diff
        // currently undo from tiny is used - no need to send the steps
//        foreach ($this->context->getWritingSteps(null) as $step) {
//            $steps[] = [
//              'timestamp' => $step->getTimestamp(),
//              'content' => $step->getContent(),
//              'is_delta' => $step->isDelta(),
//              'hash_before' => $step->getHashBefore(),
//              'hash_after' => $step->getHashAfter()
//            ];
//        }

        $json = [
            'settings' => [
                'headline_scheme' => $settings->getHeadlineScheme(),
                'formatting_options' => $settings->getFormattingOptions(),
                'notice_boards' => $settings->getNoticeBoards(),
                'copy_allowed' => $settings->isCopyAllowed()
            ],
            'task' => [
                'title' => $task->getTitle(),
                'instructions' => $task->getInstructions(),
                'writer_name' => $task->getWriterName(),
                'writing_end' => $task->getWritingEnd()
            ],
            'essay' => [
                'content' => $essay->getWrittenText(),
                'hash' => $essay->getWrittenHash(),
                'started' => $essay->getEditStarted(),
                'steps' => $steps
            ],
            'resources' => $resources,
        ];

        $this->setNewDataToken();
        $this->setNewFileToken();
        return $this->setResponse(StatusCode::HTTP_OK, $json);
    }

    /**
     * GET a resource file
     * @param Request  $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function getFile(Request $request, Response $response, array $args): Response
    {
        // common checks and initializations
        if (!$this->prepare($request, $response, $args, Authentication::PURPOSE_FILE)) {
            return $this->response;
        }

        foreach ($this->context->getWritingResources() as $resource) {

            if ($resource->getKey() == $args['key'] && $resource->getType() == WritingResource::TYPE_FILE) {
                $this->context->sendFileResource($resource->getKey());
                return $response;
            }
        }

        return $this->setResponse(StatusCode::HTTP_NOT_FOUND, 'resource not found');
    }


    /**
     * PUT the writing start
     * @param Request  $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function putStart(Request $request, Response $response, array $args): Response
    {
        // common checks and initializations
        if (!$this->prepare($request, $response, $args, Authentication::PURPOSE_DATA)) {
            return $this->response;
        }

        $data = $this->request->getParsedBody();
        if (!isset($data['started']) || !is_int($data['started'])) {
            return $this->setResponse(StatusCode::HTTP_BAD_REQUEST, 'start timestamp expected');
        }

        $essay = $this->context->getWrittenEssay();
        if (!empty($essay->getEditStarted()))
        {
            return $this->setResponse(StatusCode::HTTP_BAD_REQUEST, 'start is already set');
        }

        $essay = $essay->withEditStarted($data['started']);
        $this->context->setWrittenEssay($essay);

        $this->setNewDataToken();
        return $this->setResponse(StatusCode::HTTP_OK);
    }


        /**
     * PUT the settings
     * @param Request  $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function putSteps(Request $request, Response $response, array $args): Response
    {
        // common checks and initializations
        if (!$this->prepare($request, $response, $args, Authentication::PURPOSE_DATA)) {
            return $this->response;
        }

        $data = $this->request->getParsedBody();
        if (!isset($data['steps']) || !is_array($data['steps'])) {
            return $this->setResponse(StatusCode::HTTP_BAD_REQUEST, 'list of steps expected');
        }

        $dmp = new DiffMatchPatch();

        $essay = $this->context->getWrittenEssay();
        $currentText = $essay->getWrittenText();
        $currentHash = $essay->getWrittenHash();

        $steps = [];
        foreach($data['steps'] as $entry) {
            $step = new WritingStep(
                $entry['timestamp'],
                $entry['content'],
                $entry['is_delta'],
                $entry['hash_before'],
                $entry['hash_after']
            );

            // check if step can be added
            // fault tolerance if a former put was partially applied or the response to the app was lost
            // then this list may include steps that are already saved
            // exclude these steps because they will corrupt the sequence
            // later steps may fit again
            if ($step->getHashBefore() !== $currentHash) {
                if ($step->isDelta()) {
                    // don't add a delta step that can't be applied
                    // step may already be saved, so a later new step may fit
                    continue;
                }
                elseif ($this->context->hasWritingStepByHashAfter($step->getHashAfter())) {
                    // the same full save should not be saved twice
                    // note: hash_after is salted by timestamp and is unique
                    continue;
                }
            }
            $steps[] = $step;

            if ($step->isDelta()) {
                $patches = $dmp->patch_fromText($step->getContent());
                $result =  $dmp->patch_apply($patches, $currentText);
                $currentText = $result[0];
            }
            else {
                $currentText = $step->getContent();
            }
            $currentHash = $step->getHashAfter();
        }


        // save the data
        $this->context->addWritingSteps($steps);
        $this->context->setWrittenEssay($essay
            ->withWrittenText($currentText)
            ->withWrittenHash($currentHash)
            ->withProcessedText($this->dependencies->html()->processWrittenTextForDisplay($currentText))
        );

        $this->setNewDataToken();
        return $this->setResponse(StatusCode::HTTP_OK);
    }
}