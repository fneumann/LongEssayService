<?php

namespace Edutiek\LongEssayService\Data;

/**
 * Data object for a writing Task
 */
class WritingTask
{
    /**
     * Constructor (see getters)
     */
    public function __construct(string $instructions, ?int $writing_end)
    {
        $this->instructions = $instructions;
        $this->writing_end = $writing_end;
    }

    protected $instructions;
    protected $writing_end;


    /**
     * Instructions that are shown to the student when the writer opens
     */
    public function getInstructions(): ?string
    {
        return $this->instructions;
    }


    /**
     * Unix timestamp for the end of writing
     */
    public function getWritingEnd(): ?int
    {
        return $this->writing_end;
    }
}