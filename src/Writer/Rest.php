<?php

namespace Edutiek\LongEssayService\Writer;

use Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Base\BaseContext;
use Edutiek\LongEssayService\Data\WritingStep;
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
        if (!$this->prepare($request, $response, $args)) {
            return $this->response;
        }

        $task = $this->context->getWritingTask();
        $essay = $this->context->getWrittenEssay();

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
            ]
        ];

        $this->refreshToken();
        return $this->setResponse(StatusCode::HTTP_OK, $json);
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
        if (!$this->prepare($request, $response, $args)) {
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
            ->withProcessedText($this->dependencies->html()->processWrittenText($currentText))
        );

        $this->refreshToken();
        return $this->setResponse(StatusCode::HTTP_OK);
    }
}