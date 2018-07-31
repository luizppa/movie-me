import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Movie } from '../../models/movie.model'

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  @Input() movie_src: any
  @Input() page_name: string
  public page_index: number
  public movies: Movie[] = null

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.page_index = this.activatedRoute.snapshot.params['page']
    this.get_movies()
    this.activatedRoute.params.subscribe(params => {
      this.page_index = params['page']
      this.get_movies()
      document.getElementById('start').scrollIntoView()
    })
  }

  public get_movies(){
    this.movie_src(this.page_index,
      movies => {
        this.movies = movies
      },
      error => {
        console.log(error)
      },
      'w185'
    )
  }

  public navigate(forward: boolean){
    let new_index
    if(forward && this.page_index < 1000){
      new_index = +this.page_index+1
      this.router.navigate([this.page_name, new_index])
    }
    else{
      if(this.page_index > 1){
        new_index = +this.page_index-1
        this.router.navigate([this.page_name, new_index])
      }
    }
  }

  public go_to(page: number){
    this.router.navigate([this.page_name, page])
  }

}
