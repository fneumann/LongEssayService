<?php

namespace Edutiek\LongEssayService\Internal;

class Dependencies
{
    protected ?Authentication $authentication;

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


}