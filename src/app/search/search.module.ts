import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './search.component';
import {ProductsService} from '@app/product/products.service';
import {SearchResultComponent} from '@app/search/search-result.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        SearchRoutingModule,
        NgxPaginationModule,
        FormsModule
    ],
    declarations: [
        SearchComponent,
        SearchResultComponent
    ],
    providers: [
        ProductsService
    ]
})
export class SearchModule {
}
