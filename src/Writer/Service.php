<?php

namespace Edutiek\LongEssayService\Writer;


/**
 * API of the LongEssayService for an LMS related to the writing of essays
 * @package Edutiek\LongEssayService\Writer
 */
class Service
{
    /**
     * @const Path of the frontend web app, relative to the service root directory, without starting slash
     */
    public const FRONTEND_RELATIVE_PATH = 'node_modules/long-essay-writer/dist/index.html';


    /**
     * @var Context
     */
    protected $context;

    /**
     * Service constructor.
     * A class implementing the Context interface must be provided by the LMS for this service
     *
     * @param Context $context
     */
    public function __construct(Context $context)
    {
        $this->context = $context;
    }

    /**
     * Add the necessary parameters to the frontend URL and send a redirection to it
     */
    public function openFrontend()
    {
        header('Location: ' . $this->context->getFrontendUrl());
    }

    /**
     * Handle a REST like request from the LongEssayWriter Web App
     */
    public function handleRequest()
    {

    }
}