<?php

namespace Edutiek\LongEssayService\Writer;
use Edutiek\LongEssayService\Base;

/**
 * Required interface of a context application (e.g. an LMS) calling the writer service
 * A class implementing this interface must be provided in the constructor of the writer service
 *
 * @package Edutiek\LongEssayService\Writer
 */
interface Context extends Base\Context
{

}