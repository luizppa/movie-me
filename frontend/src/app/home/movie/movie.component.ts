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
  public background: string = ''

  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id']
    this.movieService.get(id,
      movie => {
        this.movie = movie
        this.background = movie.images.backdrop
        console.log(this.movie)
      },
      error => {
        console.log(error)
      }
    )
  }

}
