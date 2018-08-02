<?php

namespace App\Routes;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use \App\Controllers\MovieController as MovieController;
use \App\Models\Session as Session;

class MovieRoutes{

  function __construct(){}

  public function status($request, $response, $args){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      try{
        $movie_id = $args['id'];
        $data = MovieController::status($user->id, $movie_id);
        return $response->withJson($data)->withStatus($data['status']);
      }
      catch (\Exception $e) {
        $data = array('type' => 'Error', 'message' => $e->getMessage());
        return $response->withJson($data)->withStatus(400);
      }
    }
    else {
      $data = array('type' => 'Error', 'message' => 'Auth required');
      return $response->withJson($data)->withStatus(403);
    }
  }

  public function make_favorite($request, $response){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    $body = $request->getParsedBody();
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      try{
        $data = MovieController::make_favorite($body, $user->id);
        return $response->withJson($data)->withStatus($data['status']);
      }
      catch (\Exception $e) {
        $data = array('type' => 'Error', 'message' => $e->getMessage());
        return $response->withJson($data)->withStatus(400);
      }
    }
    else {
      $data = array('type' => 'Error', 'message' => 'Auth required');
      return $response->withJson($data)->withStatus(403);
    }
  }

  public function get_favorites($request, $response){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      try{
        $data = MovieController::get_favorites($user->id);
        return $response->withJson($data)->withStatus($data['status']);
      }
      catch (\Exception $e) {
        $data = array('type' => 'Error', 'message' => $e->getMessage());
        return $response->withJson($data)->withStatus(400);
      }
    }
    else {
      $data = array('type' => 'Error', 'message' => 'Auth required');
      return $response->withJson($data)->withStatus(403);
    }
  }

  public function watch_later($request, $response){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    $body = $request->getParsedBody();
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      try{
        $data = MovieController::watch_later($body, $user->id);
        return $response->withJson($data)->withStatus($data['status']);
      }
      catch (\Exception $e) {
        $data = array('type' => 'Error', 'message' => $e->getMessage());
        return $response->withJson($data)->withStatus(400);
      }
    }
    else {
      $data = array('type' => 'Error', 'message' => 'Auth required');
      return $response->withJson($data)->withStatus(403);
    }
  }

  public function get_watch_later($request, $response){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      try{
        $data = MovieController::get_watch_later($user->id);
        return $response->withJson($data)->withStatus($data['status']);
      }
      catch (\Exception $e) {
        $data = array('type' => 'Error', 'message' => $e->getMessage());
        return $response->withJson($data)->withStatus(400);
      }
    }
    else {
      $data = array('type' => 'Error', 'message' => 'Auth required');
      return $response->withJson($data)->withStatus(403);
    }
  }

  public function watched($request, $response){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    $body = $request->getParsedBody();
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      try{
        $data = MovieController::watched($body, $user->id);
        return $response->withJson($data)->withStatus($data['status']);
      }
      catch (\Exception $e) {
        $data = array('type' => 'Error', 'message' => $e->getMessage());
        return $response->withJson($data)->withStatus(400);
      }
    }
    else {
      $data = array('type' => 'Error', 'message' => 'Auth required');
      return $response->withJson($data)->withStatus(403);
    }
  }

  public function get_watched($request, $response){
    $access_key = $request->getHeaders()['HTTP_AUTHORIZATION'][0];
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      try{
        $data = MovieController::get_watched($user->id);
        return $response->withJson($data)->withStatus($data['status']);
      }
      catch (\Exception $e) {
        $data = array('type' => 'Error', 'message' => $e->getMessage());
        return $response->withJson($data)->withStatus(400);
      }
    }
    else {
      $data = array('type' => 'Error', 'message' => 'Auth required');
      return $response->withJson($data)->withStatus(403);
    }
  }
}

?>
