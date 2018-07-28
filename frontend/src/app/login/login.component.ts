import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { UserService } from '../shared/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = null

  constructor(private formBuilder: FormBuilder, private userService: UserService){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    })
  }

  public submit(){
    console.log(this.loginForm.value)
    this.userService.login(this.loginForm.value,
      success => {
        console.log(success)
      },
      error => {
        console.log(error)
      }
    )
  }

}
