# Movie Me

### A platform for you to keep track of the movies you watched/want to watch

* See what is trending
* Mark movies to watch later
* Mark your favourite movies
* Mark the movies you already watched
* Comment and discuss movies

Create an account (be aware, passwords are not _yet_ encripted).
This application is built around [IMDb REST API](https://developer.imdb.com/).

## Run & Build

Clone the project and have php, composer, php-mysql, node, npm and angular cli installed. Also install a mysql server/client if you want to host your own database.

### Frontend

To run, from the `frontend/` directory run:
```
$ npm install && ng serve
```
To build run:
```
$ npm install && ng build --prod --aot
```

### Backend

From the `backend/src/` directory run:
```
$ composer install && php -S localhost:8080 -t public
```
To deploy the application you will need to configure a server like Apache or Nginx, which I won't cover here.
