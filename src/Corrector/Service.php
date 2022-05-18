<?php

namespace Edutiek\LongEssayService\Corrector;
use Edutiek\LongEssayService\Base;

/**
 * API of the LongEssayService for an LMS related to the correction of essays
 * @package Edutiek\LongEssayService\Corrector
 */
class Service extends Base\BaseService
{
    /**
     * @const Path of the frontend web app, relative to the service root directory, without starting slash
     */
    public const FRONTEND_RELATIVE_PATH = 'node_modules/long-essay-corrector/dist/index.html';

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
     * @inheritDoc
     */
    protected function setSpecificFrontendParams()
    {
        if (!empty($item = $this->context->getCurrentItem())) {
            $this->setFrontendParam('Item', $item->getKey());
        }
    }



    /**
     * Handle a REST like request from the LongEssayCorrector Web App
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

}