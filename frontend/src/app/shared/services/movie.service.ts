import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { ActivatedRoute } from '@angular/router'

import { UserService } from './user.service'
import { Movie } from '../models/movie.model'
import { environment } from '../../../environments/environment'

@Injectable()
export class MovieService {

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private userService: UserService){}

  public get(id: number, callback, callbackErr, size: string ='original'){
    this.http.get(environment.tmdb_endpoint+'movie/'+id+'?api_key='+environment.api_key+'&language='+environment.language).subscribe(
      success => {
        let movie_data = success.json()
        let movie = Movie.from_params(movie_data, size)
        callback(movie)
      },
      error => {
        callbackErr(error.json())
      }
    )
  }

  public popular(page: number = 1, callback, callbackErr, size: string ='original'){
    this.http.get(environment.tmdb_endpoint+'movie/popular?api_key='+environment.api_key+'&language='+environment.language+'&page='+page).subscribe(
      success => {
        let popular = success.json()
        let movies_data: any[] = popular.results
        let movies: Movie[] = []
        movies = movies_data.map((movie_data) => {
          return Movie.from_info(movie_data, size)
        })
        callback(movies)
      },
      error => {
        callbackErr(error.json())
      }
    )
  }

  public top_rated(page: number = 1, callback, callbackErr, size: string ='original'){
    this.http.get(environment.tmdb_endpoint+'movie/top_rated?api_key='+environment.api_key+'&language='+environment.language+'&page='+page).subscribe(
      success => {
        let top_rated = success.json()
        let movies_data: any[] = top_rated.results
        let movies: Movie[] = []
        movies = movies_data.map((movie_data) => {
          return Movie.from_info(movie_data, size)
        })
        callback(movies)
      },
      error => {
        callbackErr(error.json())
      }
    )
  }

  public similar(id: number, page: number = 1, callback, callbackErr, size: string ='original'){
    this.http.get(environment.tmdb_endpoint+'movie/'+id+'/similar?api_key='+environment.api_key+'&language='+environment.language+'&page='+page).subscribe(
      success => {
        let similar = success.json()
        let movies_data: any[] = similar.results
        let movies: Movie[] = []
        movies = movies_data.map((movie_data) => {
          return Movie.from_info(movie_data, size)
        })
        callback(movies)
      },
      error => {
        callbackErr(error.json())
      }
    )
  }

  public search(page: number = 1, callback, callbackErr, size: string ='original'){
    let query = this.activatedRoute.snapshot.queryParams['search']
    this.http.get(environment.tmdb_endpoint+'search/movie?api_key='+environment.api_key+'&language='+environment.language+'&page='+page+'&query='+query).subscribe(
      success => {
        let matched = success.json()
        let movies_data: any[] = matched.results
        let movies: Movie[] = []
        movies = movies_data.map((movie_data) => {
          return Movie.from_info(movie_data, size)
        })
        callback(movies)
      },
      error => {
        callbackErr(error.json())
      }
    )
  }

  public favorite(movie: Movie, callback, callbackErr){
    let body = {
      id: movie.id,
      poster: movie.images.poster,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    }
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.post(environment.api_endpoint+'movie/favorite', body, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public get_favorites(callback, callbackErr){
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.get(environment.api_endpoint+'movie/favorites', options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public unfavorite(id: number, callback, callbackErr){
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.delete(environment.api_endpoint+'movie/unfavorite/'+id, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public watch_later(movie: Movie, callback, callbackErr){
    let body = {
      id: movie.id,
      poster: movie.images.poster,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    }
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.post(environment.api_endpoint+'movie/watch_later', body, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public get_watch_later(callback, callbackErr){
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.get(environment.api_endpoint+'movie/watch_later', options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public undo_watch_later(id: number, callback, callbackErr){
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.delete(environment.api_endpoint+'movie/watch_later/'+id, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public watched(movie: Movie, callback, callbackErr){
    let body = {
      id: movie.id,
      poster: movie.images.poster,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    }
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.post(environment.api_endpoint+'movie/watched', body, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public get_watched(callback, callbackErr){
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.get(environment.api_endpoint+'movie/watched', options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public undo_watched(id: number, callback, callbackErr){
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.delete(environment.api_endpoint+'movie/watched/'+id, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public status(id: number, callback, callbackErr){
    let session = this.userService.get_session()
    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.get(environment.api_endpoint+'movie/status/'+id, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

}
