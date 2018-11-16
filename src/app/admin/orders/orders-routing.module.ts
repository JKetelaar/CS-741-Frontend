import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {extract} from '@app/core';
import {Shell} from '@app/shell/shell.service';
import {OrdersComponent} from '@app/admin/orders/orders.component';
import {OrderComponent} from '@app/admin/orders/order.component';

const routes: Routes = [
    Shell.childRoutes([
        {path: 'admin/orderss', component: OrdersComponent, data: {title: extract('Orders')}},
        {path: 'admin/orders/:id', component: OrderComponent, data: {title: extract('Order')}},
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class OrdersRoutingModule {
}
