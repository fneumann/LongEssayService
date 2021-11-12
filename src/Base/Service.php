<?php

namespace Edutiek\LongEssayService\Base;


use Edutiek\LongEssayService\Data\ApiToken;

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
        // todo: move to a proper place
        $value = sprintf('%04x%04x%04x%04x%04x%04x%04x%04x',
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(16384, 20479),
            mt_rand(32768, 49151),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535));

        $ip_address = $_SERVER['REMOTE_ADDR'];

        $expires = time() + $this->context->getDefaultTokenLifetime();

        $token = new ApiToken($value, $ip_address, $expires);
        $this->context->setApiToken($token);

        // todo: look for longest common domain of current and frontend url
        setcookie('edutiek_user', $this->context->getUserKey(),'/', '', false, false);
        setcookie('edutiek_task', $this->context->getTaskKey(),'/', '', false, false);
        setcookie('edutiek_backend', $this->context->getBackendUrl(),'/', '', false, false);
        setcookie('edutiek_token', $token->getValue(), '/', '', false, false);

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
        elseif ($token->getValue() != $token_value) {
            // todo: respond token used by other instance
        }
        elseif ($token->getExpires() < time()) {
            // todo: respond authorization timed out
        }

        // todo: now handle the request
    }
}