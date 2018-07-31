import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { ActivatedRoute } from '@angular/router'

import { Movie } from '../models/movie.model'
import { environment } from '../../../environments/environment'

@Injectable()
export class MovieService {

  constructor(private http: Http, private activatedRoute: ActivatedRoute){}

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

}
