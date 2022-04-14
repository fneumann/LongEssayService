<?php

namespace Edutiek\LongEssayService\Writer;
use Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Data\WritingStep;
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

    /**
     * Get the written essay text that is currently saved
     */
    public function getWrittenText(): string;

    /**
     * Get the hash value of the written text (hashing is done by the service and saved with the text)
     */
    public function getWrittenHash(): string;

    /**
     * Set and save the written text with its hash value
     */
    public function setWrittenText(string $text, string $hash): void;

    /**
     * Get the writing steps that lead to the written text
     * This may return an empty array if the context does not provide a writing history
     *
     * - steps must be returned in their saving order
     * - the hash before each step must be equal to the hash after the previous step
     * - The resulting content after the last save must be equal to getWrittenText()
     * - The hash after the last step must be equal to getWrittenHash()
     *
     * @param ?int $maximum Maximum number of provided steps (from the end). Get all steps, if not set
     * @return WritingStep[]
     */
    public function getWritingSteps(?int $maximum): array;

    /**
     * Add writing steps to the history
     * This may be ignored if the context does not provide a writing history
     * @param WritingStep[] $steps
     */
    public function addWritingSteps(array $steps);


    /**
     * Check if a writing step with a hash after application already exists
     * This is used to ensure a correct sequence of writing steps
     * Note: the hash is a combination of the resulting text and the timestamp and therefore unique
     */
    public function hasWritingStepByHashAfter(string $hash_after): bool;
}