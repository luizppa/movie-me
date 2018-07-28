import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpModule } from "@angular/http"
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

import { UserService } from './shared/services/user.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
