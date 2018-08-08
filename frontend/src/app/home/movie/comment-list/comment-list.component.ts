import { Component, OnInit, Input } from '@angular/core'

import { Movie } from '../../../shared/models/movie.model'
import { MovieService } from '../../../shared/services/movie.service'
import { UserService } from '../../../shared/services/user.service'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() movie: any
  @Input() comments: any[]
  public comment_text: string

  constructor(private movieService: MovieService, private userService: UserService){}

  ngOnInit() {
  }

  public post_comment(){
    if(this.comment_text.length){
      this.movieService.comment(this.movie.id, this.comment_text,
        success => {
          let session = this.userService.get_session()
          this.comments.unshift({
            user: {
              name: session.user.name
            },
            comment_text: this.comment_text,
            likes: 0
          })
          this.comment_text = ''
        },
        error => {
          console.log(error)
        }
      )
    }
  }

}
