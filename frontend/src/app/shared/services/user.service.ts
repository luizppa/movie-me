import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

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
        let session = success.json().session
        localStorage.setItem('session', JSON.stringify(session))
        callback(success.json())
      },
      error => {
        callbackErr(error.json())
      }
    )
  }

  public logout(callback, callbackErr){
    let session = this.get_session()

    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.delete(environment.api_endpoint+'user/logout', options).subscribe(
        success => {
          callback(success)
        },
        error => {
          callbackErr(error)
        }
      )
      localStorage.removeItem('session')
    }
  }

  public get_info(callback, callbackErr){
    let session = this.get_session()

    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.get(environment.api_endpoint+'user/me', options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public update(id, updates: any, callback, callbackErr){
    let session = this.get_session()

    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.put(environment.api_endpoint+'user/update', updates, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

  public get_session(){
    return JSON.parse(localStorage.getItem('session'))
  }

}
