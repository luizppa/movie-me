import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpModule } from "@angular/http"
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { NavbarComponent } from './home/navbar/navbar.component'
import { InitialComponent } from './home/initial/initial.component'
import { PopularCarouselComponent } from './shared/components/popular-carousel/popular-carousel.component'
import { MovieThumbComponent } from './shared/components/movie-thumb/movie-thumb.component'
import { MovieComponent } from './home/movie/movie.component'
import { TopRatedCarouselComponent } from './shared/components/top-rated-carousel/top-rated-carousel.component'
import { CarouselComponent } from './shared/components/carousel/carousel.component'
import { MovieListComponent } from './shared/components/movie-list/movie-list.component'
import { MovieListItemComponent } from './shared/components/movie-list/movie-list-item/movie-list-item.component'
import { MoviePageComponent } from './shared/components/movie-page/movie-page.component'
import { PopularComponent } from './home/popular/popular.component'
import { TopRatedComponent } from './home/top-rated/top-rated.component'
import { MovieSearchComponent } from './home/movie-search/movie-search.component'
import { FavoritesComponent } from './home/favorites/favorites.component'
import { WatchLaterComponent } from './home/watch-later/watch-later.component'
import { WatchedComponent } from './home/watched/watched.component'
import { ProfileComponent } from './home/profile/profile.component'

import { UserService } from './shared/services/user.service'
import { MovieService } from './shared/services/movie.service';
import { CommentListComponent } from './home/movie/comment-list/comment-list.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    InitialComponent,
    PopularCarouselComponent,
    MovieThumbComponent,
    TopRatedCarouselComponent,
    MovieComponent,
    CarouselComponent,
    MovieListComponent,
    MovieListItemComponent,
    MoviePageComponent,
    PopularComponent,
    TopRatedComponent,
    MovieSearchComponent,
    FavoritesComponent,
    WatchLaterComponent,
    WatchedComponent,
    ProfileComponent,
    CommentListComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpModule
  ],
  providers: [
    UserService,
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
