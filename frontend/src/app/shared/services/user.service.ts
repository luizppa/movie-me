import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { environment } from '../../../environments/environment'

@Injectable()
export class UserService {

  constructor(private http: Http){}

  public login(values: {email: string, password: string}, callback, callbackErr){
    this.http.post(environment.api_endpoint+'user/login', values).subscribe(
      success => {
        callback(success)
      },
      error => {
        callbackErr(error)
      }
    )
  }

}
