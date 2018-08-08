<?php

namespace App\Controllers;

use \App\Models\Movie as Movie;

class MovieController {

  function __construct(){}

  public static function status($user_id, $movie_id){
    $favorite = Movie::is_favorite($user_id, $movie_id);
    $to_watch_later = Movie::to_watch_later($user_id, $movie_id);
    $watched = Movie::already_watched($user_id, $movie_id);
    return array('type' => 'Found', 'status' => 200, 'favorite' => $favorite, 'to_watch_later' => $to_watch_later, 'watched' => $watched);
  }

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

  public static function unfavorite($movie_id, $user_id){
    $success = Movie::unfavorite($user_id, $movie_id);
    if($success){
      return array('type' => 'Removed', 'status' => 200, 'message' => 'Movie successfuly removed');
    }
    else{
      throw new \Exception("Could not remove movie");
    }
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

  public static function remove_watch_later($movie_id, $user_id){
    $success = Movie::remove_watch_later($user_id, $movie_id);
    if($success){
      return array('type' => 'Removed', 'status' => 200, 'message' => 'Movie successfuly removed');
    }
    else{
      throw new \Exception("Could not remove movie");
    }
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

  public static function remove_watched($movie_id, $user_id){
    $success = Movie::remove_watched($user_id, $movie_id);
    if($success){
      return array('type' => 'Removed', 'status' => 200, 'message' => 'Movie successfuly removed');
    }
    else{
      throw new \Exception("Could not remove movie");
    }
  }

  public static function comment($user_id, $params){
    $success = Movie::comment($user_id, $params['movie_id'], $params['text']);
    if($success){
      return array('type' => 'Added', 'status' => 201, 'message' => 'Comment created');
    }
    else{
      throw new \Exception("Could not add comment");
    }
  }

  public static function get_comments($movie_id){
    $movie = Movie::find($movie_id);
    $comments = $movie->comments();
    if($comments){
      return array('type' => 'Comments', 'status' => 200, 'message' => 'Get comments', 'comments' => $comments);
    }
    else{
      throw new \Exception("Could not get comment");
    }
  }

}


?>
