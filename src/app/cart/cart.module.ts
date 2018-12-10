import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart.component';
import {CartService} from './cart.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        CartRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CartComponent
    ],
    providers: [
        CartService
    ]
})
export class CartModule {
}
