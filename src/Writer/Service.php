<?php

namespace Edutiek\LongEssayService\Writer;
use Edutiek\LongEssayService\Base;

/**
 * API of the LongEssayService for an LMS related to the writing of essays
 * @package Edutiek\LongEssayService\Writer
 */
class Service extends Base\BaseService
{
    /**
     * @const Path of the frontend web app, relative to the service root directory, without starting slash
     */
    public const FRONTEND_RELATIVE_PATH = 'node_modules/long-essay-writer/dist/index.html';

    /** @var Context */
    protected $context;

    /**
     * Service constructor.
     * A class implementing the Context interface must be provided by the LMS for this service
     *
     * @param Context $context
     */
    public function __construct(Context $context)
    {
        parent::__construct($context);
    }

    /**
     * Handle a REST like request from the LongEssayWriter Web App
     * @throws \Throwable
     */
    public function handleRequest()
    {
        $server = new Rest(
            [
                'settings' => [
                    'displayErrorDetails' => true
                ]
            ]
        );

        $server->init($this->context, $this->dependencies);
        $server->run();
    }

    /**
     * Process the written text for being used in the corrector
     */
    public function processWrittenText()
    {
        $text = $this->context->getWrittenText();
        $text = $this->dic()->html()->cleanupWriterInput($text);
        $text = $this->dic()->html()->addParagraphNumbers($text);
        $this->context->setProcessedText($text);
    }

}