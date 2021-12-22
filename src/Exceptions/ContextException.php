<?php

namespace Edutiek\LongEssayService\Exceptions;

class ContextException extends Exception
{
    const USER_NOT_VALID = 1;
    const ENVIRONMENT_NOT_VALID = 2;
    const PERMISSION_DENIED = 3;
}