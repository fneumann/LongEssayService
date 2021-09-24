<?php

namespace Edutiek\LongEssayService\Writer;

class Service
{
    /**
     * @var Context
     */
    protected $context;

    /**
     * Service constructor.
     * A class implementing the Context interface must be provided for the service
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