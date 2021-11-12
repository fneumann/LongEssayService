<?php

namespace Edutiek\LongEssayService\Writer;
use Edutiek\LongEssayService\Base;

/**
 * API of the LongEssayService for an LMS related to the writing of essays
 * @package Edutiek\LongEssayService\Writer
 */
class Service extends Base\Service
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
        parent::__construct($context);
    }
}