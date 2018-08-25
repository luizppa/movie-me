<?php

namespace App\Models;

use \App\Interfaces\Record as Record;

abstract class MovieMeBase implements Record{

  function __construct(){}

  public static function get_mysql_credentials(){
    $file = fopen("../config/database.json", "r");
    $jsonStr = '';
    while(!feof($file)){
        $jsonStr .= fgets($file);
    }
    $credentials = json_decode($jsonStr, true);
    return $credentials;
  }

  public static function get_connection(){
    $credentials = self::get_mysql_credentials();
    $db_credentials = $credentials['development'];
    $connection = mysqli_connect($db_credentials['host'], $db_credentials['login'], $db_credentials['password'], $db_credentials['database']);
    return $connection;
  }
}

?>
