import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './search.component';
import {ProductsService} from '@app/product/products.service';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        SearchRoutingModule,
    ],
    declarations: [
        SearchComponent
    ],
    providers: [
        ProductsService
    ]
})
export class SearchModule {
}
