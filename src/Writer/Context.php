<?php


namespace Edutiek\LongEssayService\Writer;

/**
 * Required interface of a context application (e.g. an LMS) calling the writer service
 * A class implementing this interface must be provided in the constructor of the writer service
 *
 * @package Edutiek\LongEssayService\Writer
 */
interface Context
{

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
}