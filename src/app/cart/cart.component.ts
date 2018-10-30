import { Component, OnInit } from '@angular/core';
import {CartService} from '@app/cart/cart.service';
import {Cart} from '@app/models/Cart';

import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cart: Cart;
    productId: number;

    constructor(private cartService: CartService, private productsService: ProductsService) {
    }

    ngOnInit() {
        this.cartService.getCart()
            .pipe()
            .subscribe((cart: Cart) => {
                this.cart = cart;
            });
    }

    add() {
        this.cartService.add({id: this.productId});
    }

    getTotalCost(): number {
        let total = 0;
        for (let i = 0; i < this.cart.products.length; i++) {
            const product = this.cart.products[i];
            total += (product.price * product.quantity);
        }
        return total
    }

    getTotal(): number {
        let total = 0;
        for (let i = 0; i < this.cart.products.length; i++) {
            const product = this.cart.products[i];
            total += product.quantity;
        }
        return total;
    }

    getTotalSavings(): number {
        let total = 0;
        for (let i = 0; i < this.cart.products.length; i++) {
            const product = this.cart.products[i];
            const promo = !product.promoPrice ? 0 : product.promoPrice
            total += (product.price - promo);
        }
        return total === this.getTotal() ? 0 : total;
    }
    getImageURL(product: ProductView): string {
        return this.productsService.getImageURL(product.singleImage);
    }
}
