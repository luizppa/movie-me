<?php

namespace App\Controllers;

use \App\Models\Movie as Movie;

class MovieController {

  function __construct(){}

  public static function make_favorite($params, $user_id){
    $movie = Movie::find($params['id']);
    if(!$movie){
      $movie = Movie::create($params);
    }
    $success = Movie::make_favorite($user_id, $movie->id);
    if($success){
      return array('type' => 'Added', 'status' => 201, 'message' => 'Movie successfuly added');
    }
    else{
      throw new \Exception("Could not add movie");
    }
  }

  public static function get_favorites ($user_id){
    $movies = Movie::get_favorites($user_id);
    return array('type' => 'Found', 'status' => 200, 'message' => 'Movies found', 'movies' => $movies);
  }

  public static function watch_later($params, $user_id){
    $movie = Movie::find($params['id']);
    if(!$movie){
      $movie = Movie::create($params);
    }
    $success = Movie::watch_later($user_id, $movie->id);
    if($success){
      return array('type' => 'Added', 'status' => 201, 'message' => 'Movie successfuly added');
    }
    else{
      throw new \Exception("Could not add movie");
    }
  }

  public static function get_watch_later ($user_id){
    $movies = Movie::get_watch_later($user_id);
    return array('type' => 'Found', 'status' => 200, 'message' => 'Movies found', 'movies' => $movies);
  }

  public static function watched($params, $user_id){
    $movie = Movie::find($params['id']);
    if(!$movie){
      $movie = Movie::create($params);
    }
    $success = Movie::watched($user_id, $movie->id);
    if($success){
      return array('type' => 'Added', 'status' => 201, 'message' => 'Movie successfuly added');
    }
    else{
      throw new \Exception("Could not add movie");
    }
  }

  public static function get_watched ($user_id){
    $movies = Movie::get_watched($user_id);
    return array('type' => 'Found', 'status' => 200, 'message' => 'Movies found', 'movies' => $movies);
  }


}


?>
