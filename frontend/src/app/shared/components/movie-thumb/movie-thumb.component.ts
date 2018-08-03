import { Component, OnInit, Input } from '@angular/core'
import { Movie } from '../../models/movie.model'

@Component({
  selector: 'app-movie-thumb',
  templateUrl: './movie-thumb.component.html',
  styleUrls: ['./movie-thumb.component.css']
})
export class MovieThumbComponent implements OnInit {

  @Input() movie: any

  constructor() { }

  ngOnInit() {

  }

}
