import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {CheckoutService} from './checkout.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        CheckoutRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CheckoutComponent
    ],
    providers: [
        CheckoutService
    ]
})
export class CheckoutModule {
}
