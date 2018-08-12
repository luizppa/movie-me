<?php

namespace App\Models;

class User extends MovieMeBase{
    public $id;
    public $name;
    public $description;
    public $age;
    public $email;
    private $password;

    // Constructors

    function __construct ($name, $age, $email, $description = "") {
      $this->name = $name;
      $this->description = $description;
      $this->age = $age;
      $this->email = $email;
    }

    public static function withId($name, $age, $email, $description = "", $id) {
      $instance = new User($name, $age, $email, $description);
      $instance->id = $id;
      return $instance;
    }

    public static function withParams($params) {
      $name = $params['name'];
      $description = $params['description'];
      $age = $params['age'];
      $email = $params['email'];
      $instance = new User($name, $age, $email, $description);
      if(array_key_exists('id', $params)) $instance->id = $params['id'];
      return $instance;
    }

    // Getters and setters

    function getId() {
        return $this->id;
    }

    function getName() {
        return $this->name;
    }

    function getDescription() {
        return $this->description;
    }

    function getAge() {
        return $this->age;
    }

    function getEmail() {
        return $this->email;
    }

    function getPassword() {
        return $this->password;
    }

    // Data manipulation

    // Create an user on DB
    public static function create($params){
      $connection = parent::get_connection();
      $description = '"'.$params['description'].'",';
      //Not null
      if(array_key_exists('name', $params)) $name = '"'.$params['name'].'",';
      if(array_key_exists('age', $params)) $age = $params['age'].',';
      if(array_key_exists('email', $params)) $email = '"'.$params['email'].'",';
      if(array_key_exists('password', $params)) $password = '"'.$params['password'].'"';

      $query = 'INSERT INTO users (name, description, age, email, password)
                VALUES ('.$name.' '.$description.' '.$age.' '.$email.' '.$password.')';

      $response = mysqli_query($connection, $query);
      $instance = User::withParams($params);
      mysqli_close($connection);
      if($response) return $instance;
      else return false;
    }

    // Get an user from DB based on it's id
    public static function find($id){
      $connection = parent::get_connection();
      $query = 'SELECT * FROM users WHERE id = '.$id;
      $response = mysqli_query($connection, $query);
      $row = mysqli_fetch_assoc($response);
      mysqli_free_result($response);
      mysqli_close($connection);
      if($row) return User::withParams($row);
      else return false;
    }

    // Get an user from DB based on given criteria
    public static function find_by($params){
      $connection = parent::get_connection();
      $query = 'SELECT * FROM users';
      if(sizeof($params)){
        $query .= ' WHERE';
      }
      $i = 0;
      foreach ($params as $key => $value){
        $query .= ' '.$key.' = "'.$value.'"';
        if($i < sizeof($params) - 1) $query .= ' AND';
        $i++;
      }
      $query .= ' LIMIT 1';
      $response = mysqli_query($connection, $query);
      $row = mysqli_fetch_assoc($response);
      mysqli_free_result($response);
      mysqli_close($connection);
      if($row) return User::withParams($row);
      else return false;
    }

    // Get a collection of users from DB based on a given criteria
    public static function where($params, $options = array()){
      $connection = parent::get_connection();
      $query = 'SELECT * FROM users';
      if(sizeof($params)){
        $query .= ' WHERE';
      }
      $i = 0;
      foreach ($params as $key => $value){
        $query .= ' '.$key.' = "'.$value.'"';
        if($i < sizeof($params) - 1) $query .= ' AND';
        $i++;
      }
      if(array_key_exists('limit', $options)){
        $query .= ' LIMIT '.$options['limit'];
      }
      if(array_key_exists('offset', $options)){
        $query .= ' OFFSET '.$options['offset'];
      }
      $response = mysqli_query($connection, $query);
      $rows = mysqli_fetch_all($response, MYSQLI_ASSOC);
      mysqli_free_result($response);
      mysqli_close($connection);
      $users = array();
      foreach ($rows as $row){
        array_push($users, User::withParams($row));
      }
      return $users;
    }

    // Get an interval of users from DB
    public static function list($limit, $offset){
      $connection = parent::get_connection();
      $query = 'SELECT * FROM users';
      if($limit){
        $query .= ' LIMIT '.$limit;
      }
      if($offset){
        $query .= ' OFFSET '.$offset;
      }
      $response = mysqli_query($connection, $query);
      $rows = mysqli_fetch_all($response, MYSQLI_ASSOC);
      mysqli_free_result($response);
      mysqli_close($connection);
      $users = array();
      foreach ($rows as $row){
        array_push($users, User::withParams($row));
      }
      return $users;
    }

    // Update recieved params from users who match the given criteria
    public static function update($params, $criteria){
      $connection = parent::get_connection();
      $query = 'UPDATE users SET';
      $i = 0;
      foreach ($params as $key => $value){
        $query .= ' '.$key.' = "'.$value.'"';
        if($i < sizeof($params) - 1) $query .= ',';
        $i++;
      }
      if(sizeof($criteria)){
        $query .= ' WHERE';
      }
      $i = 0;
      foreach ($criteria as $key => $value){
        $query .= ' '.$key.' = "'.$value.'"';
        if($i < sizeof($params) - 1) $query .= ' AND';
        $i++;
      }
      $response = mysqli_query($connection, $query);
      mysqli_close($connection);
      return $response;
    }

    // Update recieved params from the first user who match the given criteria
    public static function update_one($params, $criteria){
      $connection = parent::get_connection();
      $query = 'UPDATE users SET';
      $i = 0;
      foreach ($params as $key => $value){
        $query .= ' '.$key.' = "'.$value.'"';
        if($i < sizeof($params) - 1) $query .= ',';
        $i++;
      }
      if(sizeof($criteria)){
        $query .= ' WHERE';
      }
      $i = 0;
      foreach ($criteria as $key => $value){
        $query .= ' '.$key.' = "'.$value.'"';
        if($i < sizeof($params) - 1) $query .= ' AND';
        $i++;
      }
      $query .= ' LIMIT 1';
      $response = mysqli_query($connection, $query);
      mysqli_close($connection);
      return $response;
    }

    public static function like_comment($id, $user_id){
      if($user_id != $id){
        $connection = parent::get_connection();
        $query = 'SELECT likes FROM comments WHERE id = '.$id;
        $response = mysqli_query($connection, $query);
        $row = mysqli_fetch_assoc($response);
        $likes = $row['likes'];
        $likes = $likes+1;
        mysqli_free_result($response);
        $query = 'UPDATE comments
                  SET likes = '.$likes.'
                  WHERE id = '.$id;
        $response = mysqli_query($connection, $query);
        mysqli_close($connection);
        return $response;
      }
      else return false;
    }
}
?>
