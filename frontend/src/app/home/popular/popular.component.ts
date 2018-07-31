import { Component, OnInit } from '@angular/core'

import { MovieService } from '../../shared/services/movie.service'

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  public movie_src: any = null

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movie_src = (page, callback, callbackErr, size) => {this.movieService.popular(page, callback, callbackErr, size)}
  }

}
