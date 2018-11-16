import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrdersComponent} from '@app/admin/orders/orders.component';
import {OrdersService} from '@app/admin/orders/orders.service';
import {OrdersRoutingModule} from '@app/admin/orders/orders-routing.module';
import {OrderComponent} from '@app/admin/orders/order.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        OrdersRoutingModule
    ],
    declarations: [
        OrdersComponent,
        OrderComponent,
    ],
    providers: [
        OrdersService
    ]
})
export class OrdersModule {
}
