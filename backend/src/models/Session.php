<?php

namespace App\Models;

class Session extends MovieMeBase{
  public $id;
  public $access_key;
  public $user;

  // Constructors

  function __construct($access_key, $user_id) {
    $this->access_key = $access_key;
    $this->user = User::find($user_id);
  }

  public static function withId($access_key, $user_id, $id) {
    $instance = new Session($access_key, $user_id);
    $instance->id = $id;
    return $instance;
  }

  public static function withParams($params) {
    $access_key = $params['access_key'];
    $user_id = $params['user_id'];
    $instance = new Session($access_key, $user_id);
    if(array_key_exists('id', $params)) $instance->id = $params['id'];
    return $instance;
  }

  // Data manipulation

  // Create a session on DB
  public static function create($params){
    $connection = parent::get_connection();

    //Not null
    if(array_key_exists('access_key', $params)) $access_key = '"'.$params['access_key'].'",';
    if(array_key_exists('user', $params)) $user_id = $params['user']->id;

    $query = 'INSERT INTO sessions (access_key, user_id)
              VALUES ('.$access_key.' '.$user_id.')';
    // var_dump($query);
    $response = mysqli_query($connection, $query);
    $instance = Session::withParams(array('access_key' => $params['access_key'], 'user_id' => $params['user']->id));
    mysqli_close($connection);
    if($response) return $instance;
    else return false;
  }

  // Get a session from DB based on it's key
  public static function find($access_key){
    $connection = parent::get_connection();
    $query = 'SELECT * FROM users WHERE access_key = "'.$access_key.'"';
    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    if($response){
      $row = mysqli_fetch_assoc($response);
      mysqli_free_result($response);
      return Session::withParams($row);
    }
    else return false;
  }

  public static function find_by($params){
  }

  public static function where($params, $options = array()){
  }

  public static function list($limit, $offset){
  }

  public static function update($params, $criteria){
  }

  public static function update_one($params, $criteria){
  }

  public static function delete($access_key){
    $connection = parent::get_connection();
    $query = 'DELETE FROM sessions WHERE access_key = "'.$access_key.'"';
    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    return $response;
  }
}
?>
