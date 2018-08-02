import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Movie } from '../../shared/models/movie.model'
import { MovieService } from '../../shared/services/movie.service'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movie: Movie = null
  public similar_movies: Movie[] = null
  public background: string = ''
  public favorite: boolean
  public watch_later: boolean
  public watched: boolean

  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id']
    this.get_data(id)
    this.activatedRoute.params.subscribe(params => {
        let new_id = params['id']
        this.get_data(new_id)
    })
  }

  public get_data(id: number){
    this.movieService.get(id,
      movie => {
        this.movie = movie
        this.background = movie.images.backdrop
      },
      error => {
        console.log(error)
      }
    )
    this.movieService.status(id,
      status => {
        this.favorite = status.favorite
        this.watch_later = status.to_watch_later
        this.watched = status.watched
      },
      error => {
        console.log(error)
      }
    )
    this.movieService.similar(id, 1,
      movies => {
        this.similar_movies = movies
      },
      error => {
        console.log(error)
      },
      'w185'
    )
  }

  public format_date(date: string): string{
    return date.split('-').reverse().join('/')
  }

  public make_favorite(){
    this.movieService.favorite(this.movie,
      success => {
        this.favorite = true
      },
      error => {
        console.log(error)
      }
    )
  }

}
