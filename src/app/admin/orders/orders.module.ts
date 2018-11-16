import {NgModule} from '@angular/core';
import {PromotionRoutingModule} from '@app/admin/promotion/promotion-routing.module';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrdersComponent} from '@app/admin/orders/orders.component';
import {OrdersService} from '@app/admin/orders/orders.service';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        PromotionRoutingModule
    ],
    declarations: [
        OrdersComponent
    ],
    providers: [
        OrdersService
    ]
})
export class OrdersModule {
}
