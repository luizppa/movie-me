import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { MovieService } from '../../shared/services/movie.service'

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  public movie_src: any = null
  public query: string

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.query = queryParams['search']
      this.movie_src = (page, callback, callbackErr, size) => {this.movieService.search(page, callback, callbackErr, size)}
    })
  }

}
