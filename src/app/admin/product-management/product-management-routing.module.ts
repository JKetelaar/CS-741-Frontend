import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {extract} from '@app/core';
import {ProductManagementComponent} from './product-management.component';
import {Shell} from '@app/shell/shell.service';

const routes: Routes = [
    Shell.childRoutes([
        {path: 'admin/product', component: ProductManagementComponent, data: {title: extract('ProductManagement')}},
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ProductManagementRoutingModule {
}
