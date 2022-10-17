<?php

namespace Edutiek\LongEssayService\Corrector;
use Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Data\CorrectionItem;
use Edutiek\LongEssayService\Data\CorrectionSettings;
use Edutiek\LongEssayService\Data\CorrectionSummary;
use Edutiek\LongEssayService\Data\CorrectionTask;
use Edutiek\LongEssayService\Data\Corrector;
use Edutiek\LongEssayService\Data\CorrectionGradeLevel;
use Edutiek\LongEssayService\Data\EnvResource;
use Edutiek\LongEssayService\Data\WrittenEssay;
use Edutiek\LongEssayService\Exceptions\ContextException;

/**
 * Required interface of a context application (e.g. an LMS) calling the corrector service
 * A class implementing this interface must be provided in the constructor of the corrector service
 *
 * @package Edutiek\LongEssayService\Corrector
 */
interface Context extends Base\BaseContext
{
    /**
     * Get the correction that should be done in the app
     * The title and instructions are shown in the app
     * The correction end will limit the time for correction
     */
    public function getCorrectionTask(): CorrectionTask;

    /**
     * Get the correction settings for the app
     */
    public function getCorrectionSettings() : CorrectionSettings;

    /**
     * Get the grade levels defined in the environment
     * @return CorrectionGradeLevel[]
     */
    public function getGradeLevels(): array;


    /**
     * Get the items that are assigned to the current user for correction
     * These items can be stepped through in the corrector app
     * @return CorrectionItem[]
     */
    public function getCorrectionItems(): array;


    /**
     * Get the current corrector
     * This corrector represents the current user
     * If the current user is no corrector (e.g. for review decision or stitch decision), return null
     */
    public function getCurrentCorrector(): ?Corrector;


    /**
     * Get the current correction item
     * This item should be initially loaded in the corrector app
     * It must be an item in the list provided by getCorrectionItems()
     */
    public function getCurrentItem(): ?CorrectionItem;


    /**
     * Get the written essay by the key of a correction item
     */
    public function getEssayOfItem(string $item_key): ?WrittenEssay;


    /**
     * Get the correctors assigned to a correction item
     * @return Corrector[]
     */
    public function getCorrectorsOfItem(string $item_key): array;


    /**
     * Get the correction summary given by a corrector for a correction item
     */
    public function getCorrectionSummary(string $item_key, string $corrector_key): ?CorrectionSummary;


    /**
     * Set the correction summary given by a corrector for a correction item
     */
    public function setCorrectionSummary(string $item_key, string $corrector_key, CorrectionSummary $summary) : void;


    /**
     * Save a stitch decision
     */
    public function saveStitchDecision(string $item_key, int $timestamp, ?float $points, ?string $grade_key) : bool;


    /**
     * Set the review mode for the corrector
     * This must be called after init()
     * @throws ContextException if user is not allowed to review corrections
     */
    public function setReview(bool $is_review);


    /**
     * Get if the corrector should be opened for review of all correctors
     */
    public function isReview() : bool;


    /**
     * Set the stitch decision mode for the corrector
     * @throws ContextException if user is not allowed to draw stitch decisions
     */
    public function setStitchDecision(bool $is_stitch_decision);


    /**
     * Get if the corrector should be opened for a stitch decision
     */
    public function isStitchDecision() : bool;
}