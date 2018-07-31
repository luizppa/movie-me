import { Component, OnInit } from '@angular/core'

import { MovieService } from '../../shared/services/movie.service'

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {

  public movie_src: any = null

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movie_src = (page, callback, callbackErr, size) => {this.movieService.top_rated(page, callback, callbackErr, size)}
  }

}
