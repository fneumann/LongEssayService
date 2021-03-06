<?php

namespace Edutiek\LongEssayService\Internal;

class Dependencies
{
    /** @var Authentication */
    protected $authentication;

    /** @var HtmlProcessing */
    protected $htmlProcessing;

    /** @var PdfGeneration */
    protected $pdfGeneration;


    /**
     * Get the object for authentication
     */
    public function auth() : Authentication
    {
        if (!isset($this->authentication)) {
            $this->authentication = new Authentication();
        }
        return $this->authentication;
    }

    /**
     * Get the object for HMTL processing
     */
    public function html() : HtmlProcessing
    {
        if (!isset($this->htmlProcessing)) {
            $this->htmlProcessing = new HtmlProcessing();
        }

        return $this->htmlProcessing;
    }

    /**
     * Get the object for PDG generation
     */
    public function pdfGeneration() : PdfGeneration
    {
        if (!isset($this->pdfGeneration)) {
            $this->pdfGeneration = new PdfGeneration();
        }
        return $this->pdfGeneration;
    }

}