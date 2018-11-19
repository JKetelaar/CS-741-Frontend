import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {extract} from '@app/core';
import {PromotionComponent} from './promotion.component';
import {Shell} from '@app/shell/shell.service';

const routes: Routes = [
    Shell.childRoutes([
        {path: 'admin/promotion', component: PromotionComponent, data: {title: extract('Promotion')}},
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PromotionRoutingModule {
}
