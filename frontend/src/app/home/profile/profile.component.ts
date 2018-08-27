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
  public new_description: string = null
  public favorites: any[]
  public watch_later: any[]
  public watched: any[]
  public watched_time: string
  public cover_picture: string
  public editing_description: boolean = false

  constructor(private userService: UserService, private movieService: MovieService) { }

  ngOnInit() {
    this.userService.get_info(
      success => {
        this.profile = success.user
        this.new_description = this.profile.description
        this.get_formated_watched_time()
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

  public edit_description(){
    this.userService.update(this.profile.id, {description: this.new_description},
      success => {
        this.editing_description = false
        this.profile.description = this.new_description
      },
      error => {
        this.editing_description = false
        console.log(error)
      }
    )
  }

  public cancel_edit_description(){
    this.new_description = this.profile.description
    this.editing_description = false
  }

  public get_formated_watched_time(){
    let hours
    let minutes
    let days
    hours = Math.floor(this.profile.watched_time/60)
    minutes = this.profile.watched_time-(hours*60)
    days = Math.floor(hours/24)
    hours -= days*24
    if(days > 0){
      this.watched_time = days+' days'
    }
    if(hours > 0){
      if(days > 0 && minutes > 0){
        this.watched_time += ', '+hours+' hours'
      }
      else if(days > 0 && !(minutes > 0)){
        this.watched_time += ' and '+hours+' hours'
      }
      else{
        this.watched_time = hours+' hours'
      }
    }
    if(minutes > 0){
      if(days > 0 || hours > 0){
        this.watched_time += ' and '+minutes+' minutes'
      }
      else{
        this.watched_time = minutes+' minutes'
      }
    }
  }

}
