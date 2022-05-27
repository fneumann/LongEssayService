<?php

namespace Edutiek\LongEssayService\Data;

class CorrectionSummary
{
    protected $text;
    protected $points;
    protected $grade_key;
    protected $last_change;
    protected $is_authorized;


    public function __construct(?string $text, ?int $points, ?string $grade_key, ?int $last_change, ?bool $is_authorized = false)
    {
        $this->text = $text;
        $this->points = $points;
        $this->grade_key = $grade_key;
        $this->last_change = $last_change;
        $this->is_authorized = $is_authorized;
    }

    /**
     * Get the textual summary
     */
    public function getText(): ?string
    {
        return $this->text;
    }

    /**
     * Get the given points
     */
    public function getPoints(): ?int
    {
        return $this->points;
    }

    /**
     * Get the key of the selected grade
     */
    public function getGradeKey(): ?string
    {
        return $this->grade_key;
    }

    /**
     * Get the unix timestamp of the last change
     */
    public function getLastChange(): ?int
    {
        return $this->last_change;
    }

    /**
     * Get the authorization status
     */
    public function isAuthorized(): bool
    {
        return $this->is_authorized;
    }
}