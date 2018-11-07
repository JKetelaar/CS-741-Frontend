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

    constructor(private productsService: ProductsService,
                private cartService: CartService,
                private route: ActivatedRoute,
                private header: HeaderComponent) {
    }

    increaseQuantity() {
        this.enteredQuantity++;
    }

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

    loadCart() {
        this.cartService.getCart()
            .pipe()
            .subscribe((cart: Cart) => {
                this.cart = cart;
            });
    }

    getImageURL(image: ProductImage): string {
        return this.productsService.getImageURL(image);
    }

    addToCart(id: number, quantity: number) {
        this.cartService.add({id: id, quantity: quantity}).pipe().subscribe(() => {
            this.header.refreshCart(true);
        });
    }
}
