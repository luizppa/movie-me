import { Component, OnInit, Input } from '@angular/core'

import { Movie } from '../../../models/movie.model'
import { MovieService } from '../../../services/movie.service'

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.css']
})
export class MovieListItemComponent implements OnInit {

  @Input() movie: any

  constructor(private movieService: MovieService){}

  ngOnInit() {
  }

  public format_date(date: string): string{
    return date.split('-').reverse().join('/')
  }

}
