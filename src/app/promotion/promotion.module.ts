import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {PromotionRoutingModule} from './promotion-routing.module';
import {PromotionComponent} from './promotion.component';
import {PromotionService} from './promotion.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        PromotionRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PromotionComponent
    ],
    providers: [
        PromotionService
    ]
})
export class PromotionModule {
}
