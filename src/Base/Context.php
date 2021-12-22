<?php

namespace Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Data\ApiToken;

/**
 * Common interface for Writer and Corrector contexts
 * The context is always bound to a current user and writing task
 * Their keys have to be provided by init()
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
     * Done by the system to open the frontend
     * Done by the service when a REST call is handled
     *
     * @param string $user_key unique key of the current user
     * @param string $environment_key unique key of the current environment
     * @return bool context could be initialized
     */
    public function init(string $user_key, string $environment_key): bool;


    /**
     * Get the Url of the frontend
     * This URL should point to the index.html of the frontend
     * Standard is to use the base URL of the installed LongEssayService and add the FRONTEND_RELATIVE_PATH
     * @see Service::FRONTEND_RELATIVE_PATH
     *
     * @return string
     */
    public function getFrontendUrl(): string;


    /**
     * Get the URL of the backend
     * This URL of the system will get REST requests from the frontend
     * The system should then hand over the request to the service
     *
     * @return string
     */
    public function getBackendUrl(): string;

    /**
     * Get the return url of the system
     * This URL of the system will be called when the frontend is closed
     *
     * @return string
     */
    public function getReturnUrl(): string;


    /**
     * Get the identifying key of the current user
     * @return string
     */
    public function getUserKey(): string;


    /**
     * Get the identifying key of the current environment
     * @return string
     */
    public function getEnvironmentKey(): string;


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
     * It should overwrite an existing api token of the current user and task
     * This will make REST calls from already opened frontends for the same context invalid
     * @param ApiToken $api_token
     */
    public function setApiToken(ApiToken $api_token);

}