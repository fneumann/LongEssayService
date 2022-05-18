<?php

namespace Edutiek\LongEssayService\Data;

class CorrectionItem
{
    protected $key;
    protected $title;

    /**
     * Constructor
     */
    public function __construct(string $key, string $title) {
        $this->key = $key;
        $this->title = $title;
    }

    /**
     * Get the key identifying the correction item
     * This will normally be the key of the essay writer
     */
    public function getKey(): string
    {
        return $this->key;
    }

    /**
     * Get the title that should be displayed for that item
     * This may be an anonymous name for the writer
     */
    public function getTitle(): string
    {
        return $this->title;
    }
}