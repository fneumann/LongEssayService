<?php

namespace Edutiek\LongEssayService\Data;

class WrittenEssay
{

    protected $written_text;
    protected $written_hash;
    protected $processed_text;
    protected $edit_started;
    protected $edit_ended;
    protected $is_authorized;


    /**
     * Constructor (see getters)
     */
    public function __construct(
        ?string $written_text,
        ?string $written_hash,
        ?string $processed_text,
        ?int $edit_started,
        ?int $edit_ended,
        bool $is_authorized) {

        $this->written_text = $written_text;
        $this->written_hash = $written_hash;
        $this->processed_text = $processed_text;
        $this->edit_started = $edit_started;
        $this->edit_ended = $edit_ended;
        $this->is_authorized = $is_authorized;
    }


    /**
     * Get the raw text (html) written by the user
     */
    public function getWrittenText(): ?string
    {
        return $this->written_text;
    }

    /**
     * Apply the raw text (html) written by the user
     */
    public function withWrittenText(?string $written_text): self
    {
        $this->written_text = $written_text;
        return $this;
    }

    /**
     * Get the hash value of the raw text written by the user
     */
    public function getWrittenHash(): ?string
    {
        return $this->written_hash;
    }

    /**
     * Apply the hash value of the raw text written by the user
     */
    public function withWrittenHash(?string $written_hash): self
    {
        $this->written_hash = $written_hash;
        return $this;
    }

    /**
     * Get the written text that has been processed for correction and review
     */
    public function getProcessedText(): ?string
    {
        return $this->processed_text;
    }

    /**
     * Apply the written text that has been processed for correction and review
     */
    public function withProcessedText(?string $processed_text): self
    {
        $this->processed_text = $processed_text;
        return $this;
    }

    /**
     * Get the unix timestamp of the time when the user started writing
     */
    public function getEditStarted(): ?int
    {
        return $this->edit_started;
    }

    /**
     * Apply the unix timestamp of the time when the user started writing
     */
    public function withEditStarted(?int $edit_started): self
    {
        $this->edit_started = $edit_started;
        return $this;
    }

    /**
     * Get the unix timestamp of the time when the user ended writing
     */
    public function getEditEnded(): ?int
    {
        return $this->edit_ended;
    }

    /**
     * Apply the unix timestamp of the time when the user ended writing
     */
    public function withEditEnded(?int $edit_ended): self
    {
        $this->edit_ended = $edit_ended;
        return $this;
    }


    /**
     * Get the authorization status by the writing user
     */
    public function isAuthorized()
    {
        return $this->is_authorized;
    }

    /**
     * apply the authorization status by the writing user
     */
    public function withIsAuthorized(bool $is_authorized)
    {
        $this->is_authorized = $is_authorized;
        return $this;
    }
}