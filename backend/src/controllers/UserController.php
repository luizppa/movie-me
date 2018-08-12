<?php

namespace App\Controllers;

use \App\Models\User as User;
use \App\Models\Session as Session;

class UserController {

  function __construct(){}

  public static function create($params){
    $user = User::create($params);
    if($user){
      return array('type' => 'Created', 'status' => 201, 'message' => 'User created!', 'user' => $user);
    }
    else {
      throw new \Exception("User could not be created!");
    }
  }

  public static function login($params){
    $user = User::find_by(['email' => $params['email'], 'password' => $params['password']]);
    if($user){
      $access_key = substr(base64_encode(sha1(mt_rand())), 0, 32);
      while (Session::find($access_key)) {
        $access_key = substr(base64_encode(sha1(mt_rand())), 0, 32);
      }
      $session = Session::create(array('access_key' => $access_key, 'user' => $user));
      return array('type' => 'Ok', 'status' => 200, 'message' => 'Successfuly logged in!', 'session' => $session);
    }
    else {
      throw new \Exception("Email or password incorrects!");
    }
  }

  public static function getInfo($access_key){
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      // $favorites = Favorites::getFrom($user->id);
      // $watch_later = WatchLater::getFrom($user->id);
      // $watched = Watched::getFrom($user->id);
      return array('type' => 'Ok', 'status' => 200, 'message' => 'none', 'user' => $user);
    }
    else {
      throw new \Exception("Auth required!");
    }
  }

  public static function get($id){
    $user = User::find($id);
    if($user){
      return array('type' => 'Ok', 'status' => 200, 'message' => 'User found!', 'user' => $user);
    }
    else {
      throw new \Exception("User could not be found!");
    }
  }

  public static function list($params){
    $users = User::list($params['limit'], $params['offset']);
    if($users){
      return array('type' => 'Ok', 'status' => 200, 'message' => 'Users found!', 'user' => $users);
    }
    else {
      throw new \Exception("User could not be found!");
    }
  }

  public static function update($params, $access_key){
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      $success = User::update_one($params, array('id' => $user->getId()));
      if($success){
        return array('type' => 'Ok', 'status' => 200, 'message' => 'Successfuly updated!');
      }
      else{
        throw new \Exception("Unable to update!");
      }
    }
    else {
      throw new \Exception("Auth required!");
    }
  }

  public static function update_all($params, $criteria){
    $success = User::update($params, $criteria);
    if($success){
      return array('type' => 'Ok', 'status' => 200, 'message' => 'Successfuly updated!');
    }
    else{
      throw new \Exception("Unable to update!");
    }
  }

  public static function update_one($params, $criteria){
    $success = User::update_one($params, $criteria);
    if($success){
      return array('type' => 'Ok', 'status' => 200, 'message' => 'Successfuly updated!');
    }
    else{
      throw new \Exception("Unable to update!");
    }
  }

  public static function like_comment($id, $access_key){
    $session = Session::find($access_key);
    if($session){
      $user = $session->user;
      $success = User::like_comment($id, $user->getId());
      if($success){
        return array('type' => 'Ok', 'status' => 200, 'message' => 'Comment liked!');
      }
      else{
        throw new \Exception("Unable to like!");
      }
    }
    else {
      throw new \Exception("Auth required!");
    }
  }

  public static function logout($access_key){
    $response = Session::delete($access_key);
    if($response){
      return array('type' => 'Ok', 'status' => 200, 'message' => 'Successfuly logged out');
    }
    else {
      throw new \Exception("Not logged in");
    }
  }

}


?>
