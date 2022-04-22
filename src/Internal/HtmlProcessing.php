<?php

namespace Edutiek\LongEssayService\Internal;

/**
 * Tool for processing HTML code coming from the rich text editor
 */
class HtmlProcessing
{
    static $counter = 1;

    /**
     * Process a html text from the writer for the corrector
     */
    public function processWrittenText(string $html) : string
    {
        $html = $this->cleanupWriterInput($html);
        $html = $this->addParagraphNumbers($html);

        return $html;
    }


    /**
     * Prepare a raw input coming from the writer for further processing
     * @param string $html
     * @return string
     */
    protected function cleanupWriterInput(string $html) : string
    {
        return $this->processXslt($html, __DIR__ . '/xsl/cleanup.xsl');
    }

    /**
     * Add numbers to the paragraphs
     * @param string $html
     * @return string
     */
    protected function addParagraphNumbers(string $html) : string
    {
        return $this->processXslt($html, __DIR__ . '/xsl/numbers.xsl');
    }

    /**
     * Get the XSLt Processor for an XSL file
     * @param string $html
     * @param string $xslt_file
     * @return string
     */
    protected function processXslt(string $html, string $xslt_file) : string
    {
        // get the xslt document
        // set the URI to allow document() within the XSL file
        $xslt_doc = new \DOMDocument('1.0', 'UTF-8');
        $xslt_doc->loadXML(file_get_contents($xslt_file));
        $xslt_doc->documentURI = $xslt_file;

        // get the xslt processor
        $xslt = new \XSLTProcessor();
        $xslt->registerPhpFunctions();
        $xslt->importStyleSheet($xslt_doc);

        // get the html document
        $dom_doc = new \DOMDocument('1.0', 'UTF-8');
        $dom_doc->loadHTML('<?xml encoding="UTF-8"?'.'>'. $html);

        $xml = $xslt->transformToXml($dom_doc);
        $xml = str_replace('<?xml version="1.0" encoding="UTF-8"?>', '', $xml);

        return $xml;
    }


    static function initCounter(): void
    {
        self::$counter = 1;
    }

    static function nextCounter(): string
    {
        return self::$counter++;
    }
}