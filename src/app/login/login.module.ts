import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {UserService} from '@app/login/user.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        FormsModule,
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UserService
    ]
})
export class LoginModule {
}
