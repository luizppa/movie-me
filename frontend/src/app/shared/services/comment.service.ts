import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { ActivatedRoute } from '@angular/router'

import { UserService } from './user.service'
import { Movie } from '../models/movie.model'
import { environment } from '../../../environments/environment'

@Injectable()
export class CommentService {

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private userService: UserService){}

  public like(id, callback, callbackErr){
    let session = this.userService.get_session()

    if(session){
      let headers = new Headers();
      headers.append('Authorization', session.access_key);
      let options = new RequestOptions({ headers });

      this.http.put(environment.api_endpoint+'comment/like/'+id, {}, options).subscribe(
        success => {
          callback(success.json())
        },
        error => {
          callbackErr(error.json())
        }
      )
    }
  }

}
