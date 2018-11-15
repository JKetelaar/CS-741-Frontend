import {Component, OnInit} from '@angular/core';
import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    page = 1;
    searchQuery: ProductView[];

    constructor(private productsService: ProductsService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.productsService.searchProduct({searchItem: this.route.snapshot.paramMap.get('searchItem')})
            .pipe()
            .subscribe((results: ProductView[]) => {
                this.searchQuery = results;
            });
    }

    getImageURL(product: ProductView): string {
        return this.productsService.getImageURL(product.singleImage);
    }
}
