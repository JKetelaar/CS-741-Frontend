import {NgModule} from '@angular/core';
import {PromotionModule} from '@app/admin/promotion/promotion.module';
import {OrdersModule} from '@app/admin/orders/orders.module';

@NgModule({
    imports: [
        PromotionModule,
        OrdersModule,
    ],
    declarations: [],
    providers: []
})
export class AdminModule {
}
