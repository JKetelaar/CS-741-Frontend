import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {extract} from '@app/core';
import {SearchComponent} from './search.component';
import {Shell} from '@app/shell/shell.service';
import {SearchResultComponent} from '@app/search/search-result.component';

const routes: Routes = [
    Shell.childRoutes([
        {path: 'search', component: SearchComponent, data: {title: extract('Search')}},
        {path: 'search/result/:searchItem', component: SearchResultComponent, data: {title: extract('SearchResult')}},
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class SearchRoutingModule {
}
