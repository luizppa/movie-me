<?php

namespace App\Controllers;

use \App\Models\User as User;

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
    if(isset($_SESSION['user'])) return array('type' => 'Ok', 'status' => 200, 'message' => 'Already logged in!', 'user' => $_SESSION['user']);
    $user = User::find_by(['email' => $params['email'], 'password' => $params['password']]);
    if($user){
      $_SESSION['user'] = $user;
      return array('type' => 'Ok', 'status' => 200, 'message' => 'Successfuly logged in!', 'user' => $user);
    }
    else {
      throw new \Exception("Email or password incorrects!");
    }
  }

  public static function getInfo(){
    if(isset($_SESSION['user'])){
      $_SESSION['user'] = User::find($_SESSION['user']->id);
      $user = $_SESSION['user'];
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

  public static function update($params){
    $user = $_SESSION['user'];
    $success = User::update_one($params, array('id' => $user->getId()));
    if($success){
      return array('type' => 'Ok', 'status' => 200, 'message' => 'Successfuly updated!');
    }
    else{
      throw new \Exception("Unable to update!");
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

  public static function logout(){
    if(isset($_SESSION['user'])){
      session_destroy();
      return array('type' => 'Ok', 'status' => 204, 'message' => 'Successfuly logged out');
    }
    else {
      throw new \Exception("Not logged in");
    }
  }
}


?>
