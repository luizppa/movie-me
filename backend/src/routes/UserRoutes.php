<?php

namespace App\Routes;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use \App\Controllers\UserController as UserController;

class UserRoutes{

  function __construct(){}

  public function create($request, $response) {
    $body = $request->getParsedBody();
    try {
      $data = UserController::create($body);
      return $response->withJson($data)->withStatus($data['status']);
    } catch (\Exception $e) {
      $data = array('type' => 'Error', 'message' => $e->getMessage());
      return $response->withJson($data)->withStatus(400);
    }
  }

  public function login($request, $response) {
    $body = $request->getParsedBody();
    try {
      $data = UserController::login($body);
      return $response->withJson($data)->withStatus($data['status']);
    } catch (\Exception $e) {
      $data = array('type' => 'Error', 'message' => $e->getMessage());
      return $response->withJson($data)->withStatus(400);
    }
  }

  public function me($request, $response){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    try {
      $data = UserController::getInfo($access_key);
      return $response->withJson($data)->withStatus($data['status']);
    } catch (\Exception $e) {
      $data = array('type' => 'Error', 'message' => $e->getMessage());
      return $response->withJson($data)->withStatus(400);
    }
  }

  public function list($request, $response) {
    $params = $request->getQueryParams();
    try {
      $data = UserController::list($params);
      return $response->withJson($data)->withStatus($data['status']);
    } catch (\Exception $e) {
      $data = array('type' => 'Error', 'message' => $e->getMessage());
      return $response->withJson($data)->withStatus(400);
    }
  }

  public function get($request, $response, $args) {
    $id = $args['id'];
    try {
      $data = UserController::get($id);
      return $response->withJson($data)->withStatus($data['status']);
    } catch (\Exception $e) {
      $data = array('type' => 'Error', 'message' => $e->getMessage());
      return $response->withJson($data)->withStatus(400);
    }
  }

  public function update($request, $response) {
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    $params = $request->getParsedBody();
    try {
      $data = UserController::update($params, $access_key);
      return $response->withJson($data)->withStatus($data['status']);
    } catch (\Exception $e) {
      $data = array('type' => 'Error', 'message' => $e->getMessage());
      return $response->withJson($data)->withStatus(400);
    }
  }

  public function update_one($request, $response, $args) {
    $params = $request->getParsedBody();
    try {
      $data = UserController::update($params, $args);
      return $response->withJson($data)->withStatus($data['status']);
    } catch (\Exception $e) {
      $data = array('type' => 'Error', 'message' => $e->getMessage());
      return $response->withJson($data)->withStatus(400);
    }
  }

  public function logout($request, $response){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    try {
      $data = UserController::logout($access_key);
      return $response->withJson($data)->withStatus($data['status']);
    } catch (\Exception $e) {
      $data = array('type' => 'Error', 'message' => $e->getMessage());
      return $response->withJson($data)->withStatus(400);
    }
  }

  public function delete($request, $response, $args) {
    return $response->withJson("Delete ".$args['id'])->withStatus(200);
  }
}

?>
