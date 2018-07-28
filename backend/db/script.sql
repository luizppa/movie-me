DROP DATABASE IF EXISTS dbMovieme;
CREATE DATABASE dbMovieme;
USE dbMovieme;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(255),
   age INT NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   PRIMARY KEY (id)
);

DROP TABLE IF EXISTS movies;

CREATE TABLE movies(
   id INT NOT NULL,
   external_id INT NOT NULL,
   title VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   image VARCHAR(255) NOT NULL,
   release_date DATE NOT NULL,
   rating NUMBER NOT NULL,
   director VARCHAR(255) NOT NULL,
   PRIMARY KEY (id)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
  id INT NOT NULL AUTO_INCREMENT,
  comment_text VARCHAR(255) NOT NULL,
  likes INT NOT NULL DEFAULT 0,
  movie_id INT,
  user_id INT,
  CONSTRAINT fk_comment_movie FOREIGN KEY (movie_id) REFERENCES movies(id),
  CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites(
  id INT NOT NULL AUTO_INCREMENT,
  movie_id INT,
  user_id INT,
  CONSTRAINT fk_favorite_movie FOREIGN KEY (movie_id) REFERENCES movies(id),
  CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS watch_later;

CREATE TABLE watch_later(
  id INT NOT NULL AUTO_INCREMENT,
  movie_id INT,
  user_id INT,
  CONSTRAINT fk_watch_later_movie FOREIGN KEY (movie_id) REFERENCES movies(id),
  CONSTRAINT fk_watch_later_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS watched;

CREATE TABLE watched(
  id INT NOT NULL AUTO_INCREMENT,
  movie_id INT,
  user_id INT,
  CONSTRAINT fk_watched_movie FOREIGN KEY (movie_id) REFERENCES movies(id),
  CONSTRAINT fk_watched_user FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

INSERT INTO users (name, age, email, password) VALUES ('Luiz Philippe', 20, 'luizphilippep@gmail.com', '123456');
