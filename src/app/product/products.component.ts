import {Component, OnInit} from '@angular/core';
import {ProductsService} from '@app/product/products.service';
import {ProductView} from '@app/models/ProductView';
import {CartService} from '@app/cart/cart.service';
import {HeaderComponent} from '@app/shell/header/header.component';

@Component({
    selector: 'app-product',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],

})

export class ProductsComponent implements OnInit {
    page = 1;
    products: ProductView[];

    constructor(private productsService: ProductsService,
                private cartService: CartService,
                private header: HeaderComponent) {
    }

    ngOnInit() {
        this.productsService.getProducts()
            .pipe()
            .subscribe((products: ProductView[]) => {
                this.products = products;
            });
    }

    /**
     * Method to get the image url of a single product.
     *
     * @param product - The ProductView object containing a single image.
     */
    getImageURL(product: ProductView): string {
        return this.productsService.getImageURL(product.singleImage);
    }

    /**
     * Method to add product to the cart.
     *
     * @param id - Id of the product to be added.
     */
    addToCart(id: number) {
        this.cartService.add({id: id, quantity: null}).pipe().subscribe(() => {
            this.header.refreshCart(true);
        });
    }
}
