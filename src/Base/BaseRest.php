<?php

namespace Edutiek\LongEssayService\Base;

use Edutiek\LongEssayService\Exceptions\ContextException;
use Edutiek\LongEssayService\Internal\Dependencies;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\StatusCode;

abstract class BaseRest extends App
{
    /** @var BaseContext */
    protected $context;

    /** @var Dependencies */
    protected $dependencies;

    /** @var Request */
    protected $request;

    /** @var Response */
    protected $response;

    /** @var array */
    protected $args;

    /** @var array */
    protected $params;


    /**
     * Init server / add handlers
     */
    public function init(BaseContext $context, Dependencies $dependencies)
    {
        $this->context = $context;
        $this->dependencies = $dependencies;
    }


    /**
     * Prepare the request processing (access check, init of properties)
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return bool
     */
    protected function prepare(Request $request, Response $response, array $args): bool
    {
        $this->request = $request;
        $this->response = $response;
        $this->args = $args;
        $this->params = $request->getParams();

        $user_key = $this->params['LongEssayUser'];
        $env_key = $this->params['LongEssayEnvironment'];
        $time = $this->params['LongEssayTime'];
        $signature = $this->params['LongEssaySignature'];

        if (empty($user_key)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'missing LongEssayUser param');
            return false;
        }
        if (empty($env_key)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'missing LongEssayEnvironment param');
            return false;
        }
        if (empty($time)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'missing LongEssayTime param');
            return false;
        }
        if (empty($signature)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'missing LongEssaySignature param');
            return false;
        }

        try {
            $this->context->init($user_key, $env_key);
        }
        catch (ContextException $e) {
            switch ($e->getCode()) {
                case ContextException::USER_NOT_VALID:
                    $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, $e->getMessage());
                    return false;
                case ContextException::ENVIRONMENT_NOT_VALID:
                    $this->setResponse(StatusCode::HTTP_BAD_REQUEST, $e->getMessage());
                    return false;
                case ContextException::PERMISSION_DENIED:
                    $this->setResponse(StatusCode::HTTP_FORBIDDEN, $e->getMessage());
                    return false;
                default:
                    $this->setResponse(StatusCode::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
                    return false;
            }
        }
        catch (\Throwable $t) {
            $this->setResponse(StatusCode::HTTP_BAD_REQUEST, $t->getMessage());
            return false;
        }

        $token = $this->context->getApiToken();

        if (!isset($token)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'current token is not found');
            return false;
        }
        if (!$this->dependencies->auth()->checkTokenValid($token)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'current token is expired');
            return false;
        }
        if (!$this->dependencies->auth()->checkRemoteAddress($token)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'client ip is not valid');
            return false;
        }
        if (!$this->dependencies->auth()->checkRequestTime($time)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'request is out of time');
            return false;
        }
        if (!$this->dependencies->auth()->checkSignature($token, $user_key, $env_key, $time, $signature)) {
            $this->setResponse(StatusCode::HTTP_UNAUTHORIZED, 'signature is wrong');
            return false;
        }

        return true;
    }

    /**
     * Set a new token and add it as header
     */
    protected function refreshToken()
    {
        $token = $this->dependencies->auth()->generateApiToken($this->context->getDefaultTokenLifetime());
        $this->context->setApiToken($token);
        $this->response = $this->response->withHeader('LongEssayToken', $token->getValue());
    }


    /**
     * Modify the response
     * @param int      $status
     * @param string|array $json
     * @return Response
     */
    protected function setResponse(int $status,  $json = []): Response
    {
        return $this->response = $this->response
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('LongEssayTime', (string) time())
            ->withStatus($status)
            ->withJson($json);
    }
}