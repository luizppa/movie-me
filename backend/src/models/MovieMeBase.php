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
    $dev_credentials = $credentials['development'];
    $connection = mysqli_connect($dev_credentials['host'], $dev_credentials['login'], $dev_credentials['password'], $dev_credentials['database']);
    return $connection;
  }
}

?>
