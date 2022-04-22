<?php

namespace Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Exceptions\ContextException;
use Edutiek\LongEssayService\Data\ApiToken;

/**
 * Common interface for Writer and Corrector contexts
 * The context is always bound to a current user and an environment (e.g. a writing task)
 * Their keys have to be provided by init()
 */
interface BaseContext
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
     * @return self
     * @throws ContextException
     */
    public function init(string $user_key, string $environment_key): void;

    /**
     * Get the name of the embedding system
     * This will be included in generated PDFs
     */
    public function getSystemName(): string;

    /**
     *  Get the ISO 639-1 Language Code
     *  This will be used for the writer and corrector GUI
     *  Currently 'de' and 'en' are supported, all other default to 'en'
     */
    public function getLanguage(): string;


    /**
     * Get the timezone identifier, e.g. 'Europe/Berlin'
     * This will be used for date and time display
     */
    public function getTimezone(): string;


    /**
     * Get the Url of the frontend
     * This URL should point to the index.html of the frontend
     * Standard is to use the base URL of the installed LongEssayService and add the FRONTEND_RELATIVE_PATH
     * @see Service::FRONTEND_RELATIVE_PATH
     */
    public function getFrontendUrl(): string;


    /**
     * Get the URL of the backend
     * This URL of the system will get REST requests from the frontend
     * The system should then hand over the request to the service
     */
    public function getBackendUrl(): string;

    /**
     * Get the return url of the system
     * This URL of the system will be called when the frontend is closed
     */
    public function getReturnUrl(): string;


    /**
     * Get the identifying key of the current user
     */
    public function getUserKey(): string;


    /**
     * Get the identifying key of the current environment
     */
    public function getEnvironmentKey(): string;


    /**
     * Get the default lifetime of an API token in seconds
     * A token will be refreshed with every REST call
     * If no call is given, an existing token will expire in this time after creation
     */
    public function getDefaultTokenLifetime(): int;


    /**
     * Get the api token for the context
     * This is used for the authorization of REST calls
     * Only one valid token should exist for the current user and task
     */
    public function getApiToken(): ?ApiToken;


    /**
     * Set a new api token for the context
     * This is used when a frontend is opened
     * It should overwrite an existing api token of the current user and task
     * This will make REST calls from already opened frontends for the same context invalid
     */
    public function setApiToken(ApiToken $api_token);

}