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
     * Check a request signature
     */
    public function checkSignature(ApiToken $token, string $user_key, string $env_key, int $time, string $signature) : bool
    {
        return (md5($user_key . $env_key . $token->getValue() . $time) == $signature);
    }

    /**
     * Check if the client ip address is allowed for a token
     */
    public function checkRemoteAddress(ApiToken $token) : bool
    {
        return ($token->getIpAddress() == $_SERVER['REMOTE_ADDR']);
    }

    /**
     * Check if the request time is valid
     */
    public function checkRequestTime(int $time) : bool
    {
        return (abs(time() - $time) < 30);
    }

    /**
     * Check if a token is still valid
     */
    public function checkTokenValid(ApiToken $token) : bool
    {
        return $token->getExpires() >= time();
    }
}