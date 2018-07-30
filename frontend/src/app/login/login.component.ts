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
  public incorrectLogin: boolean = false

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    })
    if(localStorage.getItem('session')){
      this.router.navigate([''])
    }
  }

  public onKeydown(event){
    if (event.key === "Enter") {
      this.submit()
    }
  }

  public submit(){
    this.userService.login(this.loginForm.value,
      success => {
        this.router.navigate([''])
      },
      error => {
        this.incorrectLogin = true;
      }
    )
  }

}
