<?php
namespace Edutiek\LongEssayService\Internal;

use Edutiek\LongEssayService\Data\ApiToken;

class Authentication
{
    /**
     * Generate a new token
     * @param int $lifetime
     * @return ApiToken
     */
    public function generateApiToken(int $lifetime): ApiToken
    {
        // generate a random uuid like string for the token
        $value = sprintf('%04x%04x%04x%04x%04x%04x%04x%04x',
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(16384, 20479),
            mt_rand(32768, 49151),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535));

        return new ApiToken($value, $_SERVER['REMOTE_ADDR'], time() + $lifetime);
    }

    /**
     * Check if a token is wrong
     * @param ApiToken $token
     * @param string $value
     * @return bool
     */
    public function isTokenWrong(ApiToken $token, string $value): bool
    {
        if ($token->getValue() != $value) {
            return true;
        }

        if ($token->getIpAddress() != $_SERVER['REMOTE_ADDR']) {
            return true;
        }

        return false;
    }

    /**
     * Check if a token is expired
     * @param ApiToken $token
     * @return bool
     */
    public function isTokenExpired(ApiToken $token): bool
    {
        return $token->getExpires() < time();
    }



}