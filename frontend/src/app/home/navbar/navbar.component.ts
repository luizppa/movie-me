import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../../shared/services/user.service'
import { User } from '../../shared/models/user.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public session: any
  public user: User
  public query: string

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.session = this.userService.get_session()
    this.user = this.session.user
  }

  public logout(){
    this.userService.logout(
      success => {
        this.router.navigate(['login'])
      },
      error => {
        console.log(error)
      }
    )
  }

  public onKeydown(event){
    if (event.key === "Enter") {
      this.search()
    }
  }

  public search(){
    if(this.query.length){
      this.router.navigate(['search', '1'], { queryParams: {search: this.query}})
    }
  }

}
