import {Component, OnInit} from '@angular/core';
import {Product} from '../models/Product';
import {ProductsService} from '@app/product/products.service';
import {ActivatedRoute} from '@angular/router';
import {ProductImage} from '@app/models/ProductImage';
import {CartService} from '@app/cart/cart.service';
import {HeaderComponent} from '@app/shell/header/header.component';
import {Cart} from '@app/models/Cart';


@Component({
    selector: 'app-single-product',
    templateUrl: './single-product.component.html',
    styleUrls: ['./single-product.component.scss'],

})
export class SingleProductComponent implements OnInit {
    product: Product;
    id: number;
    enteredQuantity: number;
    cart: Cart;
    slideConfig = {'slidesToShow': 1, 'slidesToScroll': 1};

    constructor(private productsService: ProductsService,
                private cartService: CartService,
                private route: ActivatedRoute,
                private header: HeaderComponent) {
    }

    /**
     * Method to increase the quantity on the current page
     */
    increaseQuantity() {
        this.enteredQuantity++;
    }

    /**
     * Method to decrease the quantity on the current page
     */
    decreaseQuantity() {
        this.enteredQuantity = this.enteredQuantity > 1 ? this.enteredQuantity - 1 : 1;
    }

    ngOnInit() {
        this.enteredQuantity = 1;
        this.productsService.getProduct({id: parseInt(this.route.snapshot.paramMap.get('id'), 10)})
            .pipe()
            .subscribe((product: Product) => {
                this.product = product;
            });
    }

    /**
     * Method to load the current cart.
     */
    loadCart() {
        this.cartService.getCart()
            .pipe()
            .subscribe((cart: Cart) => {
                this.cart = cart;
            });
    }

    /**
     * Method to get the image url of a single product.
     *
     * @param product - The ProductView object containing a single image.
     */
    getImageURL(image: ProductImage): string {
        return this.productsService.getImageURL(image);
    }

    /**
     * Method to add a product to the current cart or update the quantity of a product in the cart.
     *
     * @param id - Id of the product to be chaged or added.
     * @param quantity - Quantity of the product.
     */
    addToCart(id: number, quantity: number) {
        this.cartService.add({id: id, quantity: quantity}).pipe().subscribe(() => {
            this.header.refreshCart(true);
        });
    }
}
