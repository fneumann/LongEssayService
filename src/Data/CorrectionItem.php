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
     */
    public function getKey(): string
    {
        return $this->key;
    }

    /**
     * Get the title that should be displayed for that item
     */
    public function getTitle(): string
    {
        return $this->title;
    }
}