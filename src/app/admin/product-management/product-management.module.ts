import {NgModule} from '@angular/core';
import {ProductManagementComponent} from './product-management.component';
import {ProductManagementService} from './product-management.service';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import {ProductManagementRoutingModule} from '@app/admin/product-management/product-management-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgDatepickerModule,
        ProductManagementRoutingModule
    ],
    declarations: [
        ProductManagementComponent
    ],
    providers: [
        ProductManagementService
    ]
})
export class ProductManagementModule {
}
