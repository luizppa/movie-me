import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Movie } from '../../shared/models/movie.model'
import { MovieService } from '../../shared/services/movie.service'
import { UserService } from '../../shared/services/user.service'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movie: Movie = null
  public similar_movies: Movie[] = null
  public background: string = ''
  public favorite: boolean
  public watch_later: boolean
  public watched: boolean
  public comments: any[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private userService: UserService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id']
    this.get_data(id)
    this.activatedRoute.params.subscribe(params => {
        let new_id = params['id']
        this.get_data(new_id)
    })
  }

  public get_data(id: number){
    this.movieService.get(id,
      movie => {
        this.movie = movie
        this.background = movie.images.backdrop
      },
      error => {
        console.log(error)
      }
    )
    this.movieService.status(id,
      status => {
        this.favorite = status.favorite
        this.watch_later = status.to_watch_later
        this.watched = status.watched
      },
      error => {
        console.log(error)
      }
    )
    this.movieService.similar(id, 1,
      movies => {
        this.similar_movies = movies
      },
      error => {
        console.log(error)
      },
      'w185'
    )
    this.movieService.comments(id,
      comments => {
        this.comments = comments
        this.comments.sort((a, b) => {
          let session = this.userService.get_session()
          if(b.user.id == session.user.id){
            return 1
          }
          else{
            return 0
          }
        })
        this.comments.forEach(comment => {
          comment.likes = +comment.likes
        })
      },
      error => {
        this.comments = []
      }
    )
  }

  public format_date(date: string): string{
    return date.split('-').reverse().join('/')
  }

  public toggle_favorite(){
    if(this.favorite){
      this.movieService.unfavorite(this.movie.id,
        success => {
          this.favorite = false
        },
        error => {
          console.log(error)
        }
      )
    }
    else {
      this.movieService.favorite(this.movie,
        success => {
          this.favorite = true
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  public toggle_watch_later(){
    if(this.watch_later){
      this.movieService.undo_watch_later(this.movie.id,
        success => {
          this.watch_later = false
        },
        error => {
          console.log(error)
        }
      )
    }
    else {
      this.movieService.watch_later(this.movie,
        success => {
          this.watch_later = true
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  public toggle_watched(){
    if(this.watched){
      this.movieService.undo_watched(this.movie.id,
        success => {
          this.watched = false
        },
        error => {
          console.log(error)
        }
      )
    }
    else {
      this.movieService.watched(this.movie,
        success => {
          this.watched = true
        },
        error => {
          console.log(error)
        }
      )
    }
  }

}
