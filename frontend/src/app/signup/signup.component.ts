import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { UserService } from '../shared/services/user.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup = null

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router){}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'age': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'repeat-password': ['', [Validators.required]]
    })
  }

  public submit(){
    if(this.signupForm.valid && this.signupForm.value['password'] == this.signupForm.value['repeat-password']){
      this.userService.signup(this.signupForm.value,
        success => {
          this.router.navigate(['login'])
        },
        error => {
          console.log(error)
        }
      )
    }
  }

}
