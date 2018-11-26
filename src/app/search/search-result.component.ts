import {Component, OnInit} from '@angular/core';
import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '@app/cart/cart.service';
import {HeaderComponent} from '@app/shell/header/header.component';

@Component({
    selector: 'app-search',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    page = 1;
    searchQuery: ProductView[];

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
        private cartService: CartService,
        private header: HeaderComponent) {
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

    addToCart(id: number) {
        this.cartService.add({id: id, quantity: null}).pipe().subscribe(() => {
            this.header.refreshCart(true);
        });
    }
}
