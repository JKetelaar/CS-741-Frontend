import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {SummaryRoutingModule} from './summary-routing.module';
import {SummaryComponent} from './summary.component';
import {SummaryService} from './summary.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        SummaryRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        SummaryComponent
    ],
    providers: [
        SummaryService
    ]
})
export class SummaryModule {
}
