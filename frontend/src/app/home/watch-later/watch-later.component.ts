import { Component, OnInit } from '@angular/core'

import { MovieService } from '../../shared/services/movie.service'

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.css']
})
export class WatchLaterComponent implements OnInit {

  public movies: any = null

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.get_watch_later(
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
