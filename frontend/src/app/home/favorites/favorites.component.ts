import { Component, OnInit } from '@angular/core'

import { MovieService } from '../../shared/services/movie.service'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public movies: any = null

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.get_favorites(
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
