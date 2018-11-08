import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';
import {ProductsService} from '@app/product/products.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {SingleProductComponent} from '@app/product/single-product.component';
import {HeaderComponent} from '@app/shell/header/header.component';
import {SlickModule} from 'ngx-slick';


@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        ProductsRoutingModule,
        NgxPaginationModule,
        SlickModule,
    ],
    declarations: [
        ProductsComponent,
        SingleProductComponent
    ],
    providers: [
        ProductsService,
        HeaderComponent
    ]
})
export class ProductsModule {
}
