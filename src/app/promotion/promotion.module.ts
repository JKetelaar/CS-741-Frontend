import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import { PromotionService } from './promotion.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    PromotionRoutingModule
  ],
  declarations: [
    PromotionComponent
  ],
  providers: [
    PromotionService
  ]
})
export class PromotionModule { }
