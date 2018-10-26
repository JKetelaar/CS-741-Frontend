import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UserService} from '@app/login/user.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
    ],
    providers: [
        UserService
    ]
})
export class LoginModule {
}
