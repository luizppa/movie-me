<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(['setings' => $config]);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

const user = '/user',
      movie = '/movie';

session_start();

$app->options('/[{path:.*}]', function($request, $response){
  return $response->withStatus(200);
});

$app->group(user, function () use ($app) {
    $app->post('/create', '\App\Routes\UserRoutes:create');
    $app->post('/login', '\App\Routes\UserRoutes:login');
    $app->get('/me', '\App\Routes\UserRoutes:me');
    $app->get('/list', '\App\Routes\UserRoutes:list');
    $app->get('/{id}', '\App\Routes\UserRoutes:get');
    $app->put('/update', '\App\Routes\UserRoutes:update');
    $app->put('/update/{id}', '\App\Routes\UserRoutes:update_one');
    $app->delete('/logout', '\App\Routes\UserRoutes:logout');
    $app->delete('/{id}', '\App\Routes\UserRoutes:delete');
});

$app->run();
?>
