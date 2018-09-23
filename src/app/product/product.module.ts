import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {ProductService} from '@app/product/product.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
