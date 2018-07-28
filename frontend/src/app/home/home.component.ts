import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../shared/services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('user')){
      this.router.navigate(['login'])
    }
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
