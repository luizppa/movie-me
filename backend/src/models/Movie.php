<?php

namespace App\Models;

class Movie extends MovieMeBase{

    // Constructors

    function __construct () {
    }

    public static function withId() {
    }

    public static function withParams($params) {
    }

    // Getters and setters

    function getId() {
        return $this->id;
    }

    // Data manipulation

    // Create a movie on DB
    public static function create($params){
      // $connection = parent::get_connection();
      // $description = '"'.$params['description'].'",';
      // //Not null
      // if(array_key_exists('name', $params)) $name = '"'.$params['name'].'",';
      // if(array_key_exists('age', $params)) $age = $params['age'].',';
      // if(array_key_exists('email', $params)) $email = '"'.$params['email'].'",';
      // if(array_key_exists('password', $params)) $password = '"'.$params['password'].'"';
      //
      // $query = 'INSERT INTO users (name, description, age, email, password)
      //           VALUES ('.$name.' '.$description.' '.$age.' '.$email.' '.$password.')';
      //
      // $response = mysqli_query($connection, $query);
      // $instance = User::withParams($params);
      // mysqli_close($connection);
      // if($response) return $instance;
      // else return false;
    }

    // Get an user from DB based on it's id
    public static function find($id){
      // $connection = parent::get_connection();
      // $query = 'SELECT * FROM users WHERE id = '.$id;
      // $response = mysqli_query($connection, $query);
      // $row = mysqli_fetch_assoc($response);
      // mysqli_close($connection);
      // if($row) return User::withParams($row);
      // else return false;
    }
}
?>
