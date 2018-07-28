import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { environment } from '../../../environments/environment'

@Injectable()
export class UserService {

  constructor(private http: Http){}

  public signup(values: {email: string, password: string, age: string}, callback, callbackErr){
    this.http.post(environment.api_endpoint+'user/create', values).subscribe(
      success => {
        callback(success.json())
      },
      error => {
        callbackErr(error.json())
      }
    )
  }

  public login(values, callback, callbackErr){
    this.http.post(environment.api_endpoint+'user/login', values).subscribe(
      success => {
        let user = success.json().user
        localStorage.setItem('user', JSON.stringify(user))
        callback(success.json())
      },
      error => {
        callbackErr(error.json())
      }
    )
  }

  public logout(callback, callbackErr){
    this.http.delete(environment.api_endpoint+'user/logout').subscribe(
      success => {
        callback(success.json())
      },
      error => {
        callbackErr(error.json())
      }
    )
    if(localStorage.getItem('user')){
      localStorage.removeItem('user')
    }
  }

}
