import {Component, OnInit} from '@angular/core';
import {CartService} from '@app/cart/cart.service';
import {Cart} from '@app/models/Cart';

import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';
import {HeaderComponent} from '@app/shell/header/header.component';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cart: Cart;

    constructor(private cartService: CartService, private productsService: ProductsService, private header: HeaderComponent) {
    }

    ngOnInit() {
        this.loadCart();
    }

    loadCart() {
        this.cartService.getCart()
            .pipe()
            .subscribe((cart: Cart) => {
                this.cart = cart;
            });
    }

    add(id: number) {
        this.cartService.add({id: id}).pipe().subscribe(() => {
            this.loadCart();
            this.header.refreshCart(true);
        });
    }

    delete(id: number) {
        this.cartService.delete({id: id}).pipe().subscribe(() => {
            this.loadCart();
            this.header.refreshCart(true);
        });
    }

    adjust(id: number, quantity: number) {
        this.cartService.adjust({id: id, quantity: quantity}).pipe().subscribe(() => {
            this.loadCart();
            this.header.refreshCart(true);
        });
    }

    getTotalCost(): number {
        let total = 0;
        for (let i = 0; i < this.cart.products.length; i++) {
            const product = this.cart.products[i];
            total += (product.price * product.quantity);
        }
        return total;
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
            const promo = !product.product.promoPrice ? 0 : product.product.promoPrice;
            total += (product.price - promo);
        }
        return total === this.getTotal() ? 0 : total;
    }

    getImageURL(product: ProductView): string {
        return this.productsService.getImageURL(product.singleImage);
    }
}
