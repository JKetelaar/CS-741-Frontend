import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {extract} from '@app/core';
import {SearchComponent} from './search.component';
import {Shell} from '@app/shell/shell.service';

const routes: Routes = [
    Shell.childRoutes([
        {path: 'search', component: SearchComponent, data: {title: extract('Search')}},
        // {path: 'search/:searchQuery', component: SearchResultComponent, data: {title: extract('Product')}},
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class SearchRoutingModule {
}
