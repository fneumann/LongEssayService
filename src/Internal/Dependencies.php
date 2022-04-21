<?php

namespace Edutiek\LongEssayService\Internal;

class Dependencies
{
    /**
     * @var Authentication
     */
    protected $authentication;

    /**
     * @var HtmlProcessing
     */
    protected $htmlProcessing;

    /**
     * @return Authentication
     */
    public function auth() : Authentication
    {
        if (!isset($this->authentication)) {
            $this->authentication = new Authentication();
        }
        return $this->authentication;
    }

    /**
     * @return HtmlProcessing
     */
    public function html() : HtmlProcessing
    {
        if (!isset($this->htmlProcessing)) {
            $this->htmlProcessing = new HtmlProcessing();
        }

        return $this->htmlProcessing;
    }
}