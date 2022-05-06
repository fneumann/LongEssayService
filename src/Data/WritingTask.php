<?php

namespace Edutiek\LongEssayService\Data;

/**
 * Data object for a writing Task
 */
class WritingTask
{
    protected $title;
    protected $writer_name;
    protected $instructions;
    protected $writing_end;

    /**
     * Constructor (see getters)
     */
    public function __construct(string $title, string $instructions, ?string $writer_name, ?int $writing_end)
    {
        $this->title = $title;
        $this->instructions = $instructions;
        $this->writer_name = $writer_name;
        $this->writing_end = $writing_end;
    }

    /**
     * Title of the task, to be shown in the app bar
     */
    public function getTitle(): string {
        return $this->title;
    }

    /**
     * Instructions that are shown to the student when the writer opens
     */
    public function getInstructions(): string
    {
        return $this->instructions;
    }

    /**
     * Writer name, to be shown in the app bar, if set
     */
    public function getWriterName(): ?string {
        return $this->writer_name;
    }

    /**
     * Unix timestamp for the end of writing
     * If set, no input will be accepted after the end
     */
    public function getWritingEnd(): ?int
    {
        return $this->writing_end;
    }
}