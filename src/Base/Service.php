<?php

namespace Edutiek\LongEssayService\Base;

use Edutiek\LongEssayService\Data\ApiToken;
use Edutiek\LongEssayService\Internal\Authentication;
use Edutiek\LongEssayService\Internal\Dependencies;

/**
 * Common API of the Writer and Corrector services
 * @package Edutiek\LongEssayService\Internal
 */
abstract class Service
{
    /**
     * @const Path of the frontend web app, relative to the service root directory, without starting slash
     */
    public const FRONTEND_RELATIVE_PATH = '';


    protected $context;
    protected Dependencies $dependencies;

    /**
     * Service constructor.
     * A class implementing the Context interface must be provided by the LMS for this service
     *
     * @param Context $context
     */
    public function __construct(Context $context)
    {
        $this->context = $context;
        $this->dependencies = new Dependencies();
    }

    /**
     * Get the dependencies container
     * @return Dependencies
     */
    protected function dic(): Dependencies
    {
        return $this->dependencies;
    }

    /**
     * Add the necessary parameters for the frontend and send a redirection to it
     */
    public function openFrontend()
    {
        $token = $this->dic()->auth()->generateApiToken($this->context->getDefaultTokenLifetime());
        $this->context->setApiToken($token);

        $this->setFrontendParam('user', $this->context->getUserKey());
        $this->setFrontendParam('task', $this->context->getTaskKey());
        $this->setFrontendParam('backend', $this->context->getBackendUrl());
        $this->setFrontendParam('token', $token->getValue());

        header('Location: ' . $this->context->getFrontendUrl());
    }

    /**
     * Handle a REST like request from the LongEssayWriter Web App
     */
    public function handleRequest()
    {
        // todo: get body from REST call
        $body = json_decode('{}');

        $user_key = (string) $body['edutiek_user'];
        $task_key = (string) $body['edutiek_task'];
        $token_value = $body['edutiek_token'];

        $this->context->init($user_key, $task_key);
        $token = $this->context->getApiToken();

        if (!isset($token)) {
            // todo: respond unauthorized
        }
        if ($this->dic()->auth()->isTokenWrong($token, $token_value)) {
            // todo: respond wrong authorization
        }
        if ($this->dic()->auth()->isTokenExpired($token)) {
            // todo: respond expired
        }

        // todo: handle the request
    }


    /**
     * Set a parameter for the frontend
     *
     * Parameters are sent as cookies over https
     * They are only needed when the frontend is initialized and can expire afterwards (1 minute)
     * They should be set for the whole server path to allow a different frontend locations during development
     *
     * @param $name
     * @param $value
     */
    protected function setFrontendParam($name, $value)
    {
        setcookie('edutiek_' . $name, $value, 60, '/', '', false, false);
    }
}