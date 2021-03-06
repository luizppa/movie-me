import { Component, OnInit } from '@angular/core'

import { MovieService } from '../../services/movie.service'
import { Movie } from '../../models/movie.model'

@Component({
  selector: 'app-top-rated-carousel',
  templateUrl: './top-rated-carousel.component.html',
  styleUrls: ['./top-rated-carousel.component.css']
})
export class TopRatedCarouselComponent implements OnInit {

  public movies: Movie[]
  public start: number = 0
  public end: number = 5

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.top_rated(1,
      success => {
        this.movies = success
      },
      error => {
        console.log(error)
      },
      'w185'
    )
  }

  public scroll_left(){
    if(this.start > 0 && this.end > 5){
      this.start = this.start - 1
      this.end = this.end - 1
    }
  }

  public scroll_right(){
    if(this.start < 15 && this.end < 20){
      this.start = this.start + 1
      this.end = this.end + 1
    }
  }

}
