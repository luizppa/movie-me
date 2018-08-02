import { Component, OnInit } from '@angular/core'

import { MovieService } from '../../shared/services/movie.service'

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit {

  public movies: any = null

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.get_watched(
      success => {
        this.movies = success.movies
        this.movies.forEach(movie => {
          movie['images'] = {}
          movie.images['poster'] = movie.poster
          return movie
        })
      },
      error => {
        console.log(error)
      }
    )
  }

}
