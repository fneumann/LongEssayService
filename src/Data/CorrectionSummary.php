<?php

namespace Edutiek\LongEssayService\Data;

class CorrectionSummary
{
    protected $text;
    protected $points;
    protected $grade_key;


    public function __construct(?string $text, ?int $points, ?string $grade_key)
    {
        $this->text = $text;
        $this->points = $points;
        $this->grade_key = $grade_key;
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
}