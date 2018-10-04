import {Component, OnInit} from '@angular/core';
import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    searchQuery: ProductView[];

    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {
        this.productsService.searchProduct({searchQuery: 'culpa'})
            .pipe()
            .subscribe((results: ProductView[]) => {
                console.log(results);
                this.searchQuery = results;
            });
    }
}
