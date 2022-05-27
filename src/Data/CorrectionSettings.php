<?php

namespace Edutiek\LongEssayService\Data;

class CorrectionSettings
{
    protected $mutual_visibility;
    protected $multi_color_highlight;
    protected $max_points;
    protected $max_auto_distance;

    /**
     * Constructor (see getters)
     */
    public function __construct(bool $mutual_visibility, bool $multi_color_highlight, int $max_points, int $max_auto_distance)
    {
        $this->mutual_visibility = $mutual_visibility;
        $this->multi_color_highlight = $multi_color_highlight;
        $this->max_points = $max_points;
        $this->max_auto_distance = $max_auto_distance;
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

    /**
     * Maximum distance of points given by correctors to allow an automated finalisation
     */
    public function getMaxAutoDistance(): int
    {
        return $this->max_auto_distance;
    }
}