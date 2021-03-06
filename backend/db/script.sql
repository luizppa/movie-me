-- DROP DATABASE IF EXISTS heroku_2a46ee8b0cdcdd8;
-- CREATE DATABASE heroku_2a46ee8b0cdcdd8;
-- USE heroku_2a46ee8b0cdcdd8;

DROP DATABASE IF EXISTS dbMovieme;
CREATE DATABASE dbMovieme;
USE dbMovieme;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   age INT NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   description VARCHAR(255),
   watched_time INT NOT NULL DEFAULT 0,
   PRIMARY KEY (id)
);

DROP TABLE IF EXISTS movies;

CREATE TABLE movies(
  id INT NOT NULL UNIQUE,
  poster VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  overview TEXT NOT NULL,
  release_date VARCHAR(16) NOT NULL,
  vote_average DECIMAL(2,1) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions(
  id INT NOT NULL AUTO_INCREMENT,
  access_key VARCHAR(255) NOT NULL UNIQUE,
  user_id INT NOT NULL,
  CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
  id INT NOT NULL AUTO_INCREMENT,
  comment_text VARCHAR(255) NOT NULL,
  likes INT NOT NULL DEFAULT 0,
  movie_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites(
  id INT NOT NULL AUTO_INCREMENT,
  movie_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_favorite_movie FOREIGN KEY (movie_id) REFERENCES movies(id),
  CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS watch_later;

CREATE TABLE watch_later(
  id INT NOT NULL AUTO_INCREMENT,
  movie_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_watch_later_movie FOREIGN KEY (movie_id) REFERENCES movies(id),
  CONSTRAINT fk_watch_later_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS watched;

CREATE TABLE watched(
  id INT NOT NULL AUTO_INCREMENT,
  movie_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_watched_movie FOREIGN KEY (movie_id) REFERENCES movies(id),
  CONSTRAINT fk_watched_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);
