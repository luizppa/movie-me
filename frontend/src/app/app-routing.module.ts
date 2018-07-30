import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HomeComponent } from './home/home.component'
import { InitialComponent } from './home/initial/initial.component'
import { MovieComponent } from './home/movie/movie.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent, children:
    [
        {path: '', component: InitialComponent},
        {path: 'movie/:id', component: MovieComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
