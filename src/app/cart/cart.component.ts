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
                console.log(cart);
                console.log(cart.products);

                this.cart = cart;
            });
    }

    add() {
        this.cartService.add({id: this.productId});
    }

    getImageURL(product: ProductView): string {
        return this.productsService.getImageURL(product.singleImage);
    }
}
