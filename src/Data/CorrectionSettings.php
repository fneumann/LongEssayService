<?php

namespace Edutiek\LongEssayService\Data;

class CorrectionSettings
{
    protected $mutual_visibility;
    protected $multi_color_highlight;
    protected $max_points;

    /**
     * Constructor (see getters)
     */
    public function __construct(bool $mutual_visibility, bool $multi_color_highlight, int $max_points)
    {
        $this->mutual_visibility = $mutual_visibility;
        $this->multi_color_highlight = $multi_color_highlight;
        $this->max_points = $max_points;
    }

    /**
     * Correctors see the other's votes in the app
     */
    public function hasMutualVisibility(): bool
    {
        return $this->mutual_visibility;
    }

    /**
     * Text can be highlighted in multicolor
     */
    public function hasMultiColorHighlight() : bool
    {
        return $this->multi_color_highlight;
    }

    /**
     * Maximum Points to be given
     */
    public function getMaxPoints() : int
    {
        return $this->max_points;
    }
}