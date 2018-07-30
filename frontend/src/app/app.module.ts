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

import { UserService } from './shared/services/user.service'
import { MovieService } from './shared/services/movie.service';
import { TopRatedCarouselComponent } from './shared/components/top-rated-carousel/top-rated-carousel.component';
import { LatestCarouselComponent } from './shared/components/latest-carousel/latest-carousel.component'

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
    LatestCarouselComponent
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
