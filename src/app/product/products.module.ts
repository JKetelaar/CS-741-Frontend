import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {ProductService} from '@app/product/product.service';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ProductRoutingModule,
      NgxPaginationModule
  ],
  declarations: [
    ProductComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
