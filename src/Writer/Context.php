<?php

namespace Edutiek\LongEssayService\Writer;
use Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Data\WritingTask;

/**
 * Required interface of a context application (e.g. an LMS) calling the writer service
 * A class implementing this interface must be provided in the constructor of the writer service
 *
 * @package Edutiek\LongEssayService\Writer
 */
interface Context extends Base\BaseContext
{
    /**
     * Get the Task that should be done in the editor
     * The instructions of this task will be shown to the student when the writer is opened
     * The writing end will limit the time for writing
     */
    public function getWritingTask(): WritingTask;
}