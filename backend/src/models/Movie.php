<?php

namespace App\Models;

class Movie extends MovieMeBase{

  public $id;
  public $poster;
  public $title;
  public $overview;
  public $release_date;
  public $vote_average;

  // Constructors

  function __construct($id, $poster, $title, $overview, $release_date, $vote_average){
    $this->id = $id;
    $this->poster = $poster;
    $this->title = $title;
    $this->overview = $overview;
    $this->release_date = $release_date;
    $this->vote_average = $vote_average;
  }

  public static function withParams($params) {
    $id = $params['id'];
    $poster = $params['poster'];
    $title = $params['title'];
    $overview = $params['overview'];
    $release_date = $params['release_date'];
    $vote_average = $params['vote_average'];
    $instance = new Movie($id, $poster, $title, $overview, $release_date, $vote_average);
    return $instance;
  }

  // Data manipulation

  public static function create($params){
    $connection = parent::get_connection();
    //Not null
    if(array_key_exists('id', $params)) $id = $params['id'].',';
    if(array_key_exists('poster', $params)) $poster = '"'.$params['poster'].'",';
    if(array_key_exists('title', $params)) $title = '"'.$params['title'].'",';
    if(array_key_exists('overview', $params)) $overview = '"'.$params['overview'].'",';
    if(array_key_exists('release_date', $params)) $release_date = '"'.$params['release_date'].'",';
    if(array_key_exists('vote_average', $params)) $vote_average = $params['vote_average'];

    $query = 'INSERT INTO movies (id, poster, title, overview, release_date, vote_average)
              VALUES ('.$id.' '.$poster.' '.$title.' '.$overview.' '.$release_date.' '.$vote_average.')';

    $response = mysqli_query($connection, $query);
    $instance = Movie::withParams($params);
    mysqli_close($connection);
    if($response) return $instance;
    else return false;
  }

  public static function find($id){
    $connection = parent::get_connection();
    $query = 'SELECT * FROM movies WHERE id = '.$id;
    $response = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($response);
    mysqli_free_result($response);
    mysqli_close($connection);
    if($row) return Movie::withParams($row);
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

  public static function delete($id){
  }

  public static function is_favorite($user_id, $movie_id){
    $connection = parent::get_connection();
    $query = 'SELECT * FROM favorites
              WHERE user_id = '.$user_id.' AND movie_id = '.$movie_id;

    $response = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($response);
    mysqli_free_result($response);
    mysqli_close($connection);
    if($row) return true;
    else return false;
  }

  public static function make_favorite($user_id, $movie_id){
    if(Movie::is_favorite($user_id, $movie_id)) return false;
    $connection = parent::get_connection();
    $query = 'INSERT INTO favorites (user_id, movie_id)
              VALUES ('.$user_id.', '.$movie_id.')';

    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    if($response) return true;
    else return false;
  }

  public static function get_favorites($id){
    $connection = parent::get_connection();
    $query = 'SELECT movie_id
              FROM favorites
              WHERE user_id = '.$id;

    $response = mysqli_query($connection, $query);
    $rows = mysqli_fetch_all($response, MYSQLI_ASSOC);
    mysqli_free_result($response);
    mysqli_close($connection);
    $movies = array();
    foreach ($rows as $row){
      array_push($movies, Movie::find($row['movie_id']));
    }
    return $movies;
  }

  public static function unfavorite($user_id, $movie_id){
    $connection = parent::get_connection();
    $query = 'DELETE FROM favorites
              WHERE user_id = '.$user_id.' AND movie_id = '.$movie_id;

    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    if($response) return true;
    else return false;
  }

  public static function to_watch_later($user_id, $movie_id){
    $connection = parent::get_connection();
    $query = 'SELECT * FROM watch_later
              WHERE user_id = '.$user_id.' AND movie_id = '.$movie_id;

    $response = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($response);
    mysqli_free_result($response);
    mysqli_close($connection);
    if($row) return true;
    else return false;
  }

  public static function watch_later($user_id, $movie_id){
    if(Movie::to_watch_later($user_id, $movie_id)) return false;
    $connection = parent::get_connection();
    $query = 'INSERT INTO watch_later (user_id, movie_id)
              VALUES ('.$user_id.', '.$movie_id.')';

    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    if($response) return true;
    else return false;
  }

  public static function get_watch_later($id){
    $connection = parent::get_connection();
    $query = 'SELECT movie_id
              FROM watch_later
              WHERE user_id = '.$id;

    $response = mysqli_query($connection, $query);
    $rows = mysqli_fetch_all($response, MYSQLI_ASSOC);
    mysqli_free_result($response);
    mysqli_close($connection);
    $movies = array();
    foreach ($rows as $row){
      array_push($movies, Movie::find($row['movie_id']));
    }
    return $movies;
  }

  public static function remove_watch_later($user_id, $movie_id){
    $connection = parent::get_connection();
    $query = 'DELETE FROM watch_later
              WHERE user_id = '.$user_id.' AND movie_id = '.$movie_id;

    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    if($response) return true;
    else return false;
  }

  public static function already_watched($user_id, $movie_id){
    $connection = parent::get_connection();
    $query = 'SELECT * FROM watched
              WHERE user_id = '.$user_id.' AND movie_id = '.$movie_id;

    $response = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($response);
    mysqli_free_result($response);
    mysqli_close($connection);
    if($row) return true;
    else return false;
  }

  public static function watched($user_id, $movie_id){
    if(Movie::already_watched($user_id, $movie_id)) return false;
    $connection = parent::get_connection();
    $query = 'INSERT INTO watched (user_id, movie_id)
              VALUES ('.$user_id.', '.$movie_id.')';

    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    if($response) return true;
    else return false;
  }

  public static function get_watched($id){
    $connection = parent::get_connection();
    $query = 'SELECT movie_id
              FROM watched
              WHERE user_id = '.$id;

    $response = mysqli_query($connection, $query);
    $rows = mysqli_fetch_all($response, MYSQLI_ASSOC);
    mysqli_free_result($response);
    mysqli_close($connection);
    $movies = array();
    foreach ($rows as $row){
      array_push($movies, Movie::find($row['movie_id']));
    }
    return $movies;
  }

  public static function remove_watched($user_id, $movie_id){
    $connection = parent::get_connection();
    $query = 'DELETE FROM watched
              WHERE user_id = '.$user_id.' AND movie_id = '.$movie_id;

    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    if($response) return true;
    else return false;
  }

  public static function comment($user_id, $movie_id, $comment_text){
    $connection = parent::get_connection();
    $query = 'INSERT INTO comments (user_id, movie_id, comment_text)
              VALUES ('.$user_id.', '.$movie_id.', "'.$comment_text.'")';

    $response = mysqli_query($connection, $query);
    mysqli_close($connection);
    if($response) return true;
    else return false;
  }

  public function comments(){
    $connection = parent::get_connection();
    $query = 'SELECT * FROM comments
             WHERE movie_id = '.$this->id;

    $response = mysqli_query($connection, $query);
    $rows = mysqli_fetch_all($response, MYSQLI_ASSOC);
    mysqli_free_result($response);
    mysqli_close($connection);
    $comments = array();
    foreach ($rows as $row) {
      $comment = array(
        'id' => $row['id'],
        'likes' => $row['likes'],
        'movie_id' => $row['movie_id'],
        'comment_text' => $row['comment_text'],
        'user' => User::find($row['user_id'])
      );
      array_push($comments, $comment);
    }
    return $comments;
  }
}
?>
