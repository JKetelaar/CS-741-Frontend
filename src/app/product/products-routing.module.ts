import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {extract} from '@app/core';
import {ProductsComponent} from './products.component';
import {Shell} from '@app/shell/shell.service';
import {SingleProductComponent} from '@app/product/single-product.component';

const routes: Routes = [
    Shell.childRoutes([
        {path: 'products', component: ProductsComponent, data: {title: extract('Products')}},
        {path: 'product/:id', component: SingleProductComponent, data: {title: extract('Product')}},
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ProductsRoutingModule {
}
