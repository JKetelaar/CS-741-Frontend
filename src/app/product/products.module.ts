import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {ProductsService} from '@app/product/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import {SingleProductComponent} from '@app/product/single-product.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ProductsRoutingModule,
      NgxPaginationModule
  ],
  declarations: [
    ProductsComponent,
      SingleProductComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }