import { Component, OnInit } from '@angular/core'

import { MovieService } from '../../shared/services/movie.service'
import { UserService } from '../../shared/services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile: any
  public favorites: any[]
  public watch_later: any[]
  public watched: any[]
  public cover_picture: string

  constructor(private userService: UserService, private movieService: MovieService) { }

  ngOnInit() {
    this.userService.get_info(
      success => {
        this.profile = success.user
      },
      error => {
        console.log(error)
      }
    )
    this.movieService.get_favorites(
      success => {
        this.favorites = success.movies
        this.favorites.forEach(movie => {
          movie['images'] = {}
          movie.images['poster'] = movie.poster
          return movie
        })
        this.set_cover()
      },
      error => {
        console.log(error)
      }
    )
    this.movieService.get_watched(
      success => {
        this.watched = success.movies
        this.watched.forEach(movie => {
          movie['images'] = {}
          movie.images['poster'] = movie.poster
          return movie
        })
      },
      error => {
        console.log(error)
      }
    )
    this.movieService.get_watch_later(
      success => {
        this.watch_later = success.movies
        this.watch_later.forEach(movie => {
          movie['images'] = {}
          movie.images['poster'] = movie.poster
          return movie
        })
      },
      error => {
        console.log(error)
      }
    )
  }

  public set_cover(){
    if(this.favorites.length){
      let movie = this.favorites[Math.floor(Math.random()*this.favorites.length)]
      this.movieService.get(movie.id,
        success => {
          this.cover_picture = 'url('+success.images.backdrop+')'
        },
        error => {
          console.log(error)
        }
      )
    }
    else{
      this.cover_picture = 'url(http://econlife.com/wp-content/uploads/2014/07/Suply-and-demand-movie-theater-seats.jpg..jpg)'
    }
  }

}
