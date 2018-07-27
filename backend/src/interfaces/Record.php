<?php

namespace App\Interfaces;

interface Record{
  public static function get_mysql_credentials();
  public static function get_connection();
  public static function create($params);
  public static function find($id);
  public static function find_by($params);
  public static function where($params, $options = array());
  public static function list($limit, $offset);
  public static function update($params, $criteria);
  public static function update_one($params, $criteria);
}

?>
