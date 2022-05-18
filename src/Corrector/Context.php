<?php

namespace Edutiek\LongEssayService\Corrector;
use Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Data\CorrectionItem;
use Edutiek\LongEssayService\Data\CorrectionSummary;
use Edutiek\LongEssayService\Data\CorrectionTask;
use Edutiek\LongEssayService\Data\Corrector;
use Edutiek\LongEssayService\Data\CorrectionGradeLevel;
use Edutiek\LongEssayService\Data\EnvResource;
use Edutiek\LongEssayService\Data\WrittenEssay;

/**
 * Required interface of a context application (e.g. an LMS) calling the writer service
 * A class implementing this interface must be provided in the constructor of the writer service
 *
 * @package Edutiek\LongEssayService\Corrector
 */
interface Context extends Base\BaseContext
{
    /**
     * Get the Task that should be done in the editor
     * The instructions of this task will be shown to the student when the writer is opened
     * The writing end will limit the time for writing
     */
    public function getCorrectionTask(): CorrectionTask;


    /**
     * Get the grade levels defined in the environment
     * @return CorrectionGradeLevel[]
     */
    public function getGradeLevels(): array;


    /**
     * Get the items that are assigned for correction
     * These items can be stepped through in the corrector
     * @return CorrectionItem[]
     */
    public function getCorrectionItems(): array;


    /**
     * Get the current correction item
     * This item should be initially loaded in the opened corrector
     * It must be an item in the list provided by getCorrectionItems()
     */
    public function getCurrentItem(): ?CorrectionItem;


    /**
     * Get the written essay by the key of a correction item
     */
    public function getEssayOfItem(string $item_key): WrittenEssay;


    /**
     * Get the correctors assigned to a correction item
     * @return Corrector[]
     */
    public function getCorrectorsOfItem(string $item_key): array;


    /**
     * Get the correction summary given by a corrector for a correction item
     */
    public function getCorrectionSummary(string $item_key, string $corrector_key): CorrectionSummary;


    /**
     * Set the correction summary given by a corrector for a correction item
     */
    public function setCorrectionSummary(string $item_key, string $corrector_key, CorrectionSummary $summary);

}