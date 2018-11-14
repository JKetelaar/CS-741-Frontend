import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthenticationService} from '@app/core';
import {UserService} from '@app/login/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  isValid: boolean;
  loginUsername: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword1: string;
  registerPassword2: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.createLoginForm();
    this.createRegisterForm();
    this.isValid = null;
  }

  ngOnInit() {
  }

  login() {
    this.userService.login({username: this.loginUsername, password: this.loginPassword})
      .subscribe(result => {
        result === 'Error, could not login user' ? this.isValid = false : this.isValid = true;

        if (this.isValid) {
          window.location.href = '/home';
        }
      });
  }

  register() {
    this.userService.register(
      {email: this.registerEmail, password: this.registerPassword1, password2: this.registerPassword2}
    )
      .subscribe(result => {
        result === 'Error, could not register user' ? this.isValid = false : this.isValid = true;
      });
  }

  resetValid() {
    this.isValid = null;
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

  private createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordValidate: ['', Validators.required],
    });
  }
}
