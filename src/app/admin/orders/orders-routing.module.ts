import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {extract} from '@app/core';
import {Shell} from '@app/shell/shell.service';
import {OrdersComponent} from '@app/admin/orders/orders.component';

const routes: Routes = [
    Shell.childRoutes([
        {path: 'admin/orders', component: OrdersComponent, data: {title: extract('Promotion')}},
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class OrdersRoutingModule {
}
