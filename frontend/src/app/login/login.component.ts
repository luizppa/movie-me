import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { UserService } from '../shared/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = null

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    })
    if(localStorage.getItem('user')){
      this.router.navigate(['home'])
    }
  }

  public submit(){
    this.userService.login(this.loginForm.value,
      success => {
        let user = success.user
        localStorage.setItem('user', JSON.stringify(user))
        this.router.navigate(['home'])
      },
      error => {
        console.log(error)
      }
    )
  }

}
