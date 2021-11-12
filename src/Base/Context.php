<?php

namespace Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Data\ApiToken;

/**
 * Common Context interface for Writer and Corrector contexts
 * The context is always bound to a current user and writing task
 *
 * @package Edutiek\LongEssayService\Internal
 */
interface Context
{
    /**
     * Constructor
     */
    public function __construct();

    /**
     * Initialize the Context
     * Done by Application to open the frontend
     * Done by Service when REST call is handled
     *
     * @param string $user_key unique key of the current user
     * @param string $task_key unique key of the current task
     * @return self
     */
    public function init(string $user_key, string $task_key): self;


    /**
     * Get the Url of the frontend
     * This URL should point to the index.html of the LongEssayWriter Web App
     * Parameters will be added by the writer service
     * Standard is to use the base URL of the installed LongEssayService and add the FRONTEND_RELATIVE_PATH
     * @see Service::FRONTEND_RELATIVE_PATH
     *
     * @return string
     */
    public function getFrontendUrl(): string;


    /**
     * Get the URL of the backend
     * This URL of the context application will get REST like requests from the LongEssayWriter Web App
     * The context application should then hand over the request to the writer service
     *
     * @return string
     */
    public function getBackendUrl(): string;


    /**
     * Get the identifying key of the current user
     * @return string
     */
    public function getUserKey(): string;


    /**
     * Get the identifying key of the current task
     * @return string
     */
    public function getTaskKey(): string;


    /**
     * Get the default lifetime of an API token in seconds
     * A token will be refreshed with every REST call
     * If no call is given, an existing token will expire in this time after creation
     *
     * @return int
     */
    public function getDefaultTokenLifetime(): int;


    /**
     * Get the api token for the context
     * This is used for the authorization of REST calls
     * Only one valid token should exist for the current user and task
     *
     * @return ApiToken|null
     */
    public function getApiToken(): ?ApiToken;


    /**
     * Set a new api token for the context
     * This is used when a frontend is opened
     * It should overwrite an existing api token for the current user and task
     * this will make REST calls from already opened frontends for the same context invalid
     * @param ApiToken $api_token
     */
    public function setApiToken(ApiToken $api_token);

}