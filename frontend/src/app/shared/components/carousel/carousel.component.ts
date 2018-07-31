import { Component, OnInit, Input } from '@angular/core'

import { Movie } from '../../models/movie.model'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() movies: Movie[]
  public start: number = 0
  public end: number = 5

  constructor() {}

  ngOnInit() {
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
