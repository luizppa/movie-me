import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { InitialComponent } from './home/initial/initial.component'
import { MovieComponent } from './home/movie/movie.component'
import { PopularComponent } from './home/popular/popular.component'
import { TopRatedComponent } from './home/top-rated/top-rated.component'
import { MovieSearchComponent } from './home/movie-search/movie-search.component'
import { FavoritesComponent } from './home/favorites/favorites.component'
import { WatchLaterComponent } from './home/watch-later/watch-later.component'
import { WatchedComponent } from './home/watched/watched.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent, children:
    [
        { path: '', component: InitialComponent},
        { path: 'movie/:id', component: MovieComponent},
        { path: 'favorites', component: FavoritesComponent},
        { path: 'watch-next', component: WatchLaterComponent},
        { path: 'watched', component: WatchedComponent},
        { path: 'popular/:page', component: PopularComponent},
        { path: 'top-rated/:page', component: TopRatedComponent},
        { path: 'search/:page', component: MovieSearchComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
