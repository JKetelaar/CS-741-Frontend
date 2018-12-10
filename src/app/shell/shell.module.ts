import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ShellComponent} from './shell.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        ShellComponent
    ]
})
export class ShellModule {
}
