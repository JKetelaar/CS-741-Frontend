import {NgModule} from '@angular/core';
import {PromotionComponent} from './promotion.component';
import {PromotionService} from './promotion.service';
import {PromotionRoutingModule} from '@app/admin/promotion/promotion-routing.module';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgDatepickerModule,
        PromotionRoutingModule
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
