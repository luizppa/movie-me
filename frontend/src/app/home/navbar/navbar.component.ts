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
  public user: User

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = this.userService.get_session().user
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

}
