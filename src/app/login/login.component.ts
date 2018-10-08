import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';

import {environment} from '@env/environment';
import {AuthenticationService, Logger} from '@app/core';
import {UserService} from '@app/login/user.service';

const log = new Logger('Login');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    version: string = environment.version;
    error: string;
    loginForm: FormGroup;
    registerForm: FormGroup;
    isLoading = false;
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
    }

    ngOnInit() {
    }

    login() {
        // Not sure if we need this
        // this.isLoading = true;
        // this.authenticationService.login(this.loginForm.value)
        //     .pipe(finalize(() => {
        //         this.loginForm.markAsPristine();
        //         this.isLoading = false;
        //     }))
        //     .subscribe(credentials => {
        //         log.debug(`${credentials.username} successfully logged in`);
        //         this.router.navigate(['/'], {replaceUrl: true});
        //     }, error => {
        //         log.debug(`Login error: ${error}`);
        //         this.error = error;
        //     });
        this.userService.login({username: this.loginUsername, password: this.loginPassword })
            .subscribe(result => {
              this.userService.checkUser()
                .subscribe(result2 => {
                  console.log(result2);
                });
            });
    }

    register() {
        this.userService.register({email: this.registerEmail, password: this.registerPassword1, password2: this.registerPassword2})
            .subscribe(result => {
                console.log(result);
            });
        console.log('Ready to register to the JSON API');
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
