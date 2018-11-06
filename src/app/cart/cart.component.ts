import {Component, OnInit} from '@angular/core';
import {CartService} from '@app/cart/cart.service';
import {Cart} from '@app/models/Cart';

import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';
import {HeaderComponent} from '@app/shell/header/header.component';
import {OrderItem} from '@app/models/OrderItem';
import {PromotionService} from '@app/promotion/promotion.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cart: Cart;
    promoCode: string;

    constructor(private cartService: CartService,
                private productsService: ProductsService,
                private header: HeaderComponent,
                private promotionService: PromotionService) {
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

    apply() {
        this.promotionService.apply({code: this.promoCode}).pipe().subscribe(() => {
            this.loadCart();
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
        return this.cartService.getTotalCost(this.cart);
    }

    getOrderTotal(): number {
        return this.cartService.getOrderTotal(this.cart);
    }

    getTotal(): number {
        return this.cartService.getTotal(this.cart);
    }

    getTotalSavings(): number {
        return this.cartService.getTotalSavings(this.cart);
    }

    getTotalCostForProduct(product: OrderItem) {
        return this.cartService.getTotalCostForProduct(product);
    }

    getImageURL(product: ProductView): string {
        return this.productsService.getImageURL(product.singleImage);
    }

    getPromoPercentage(): number {
        return this.cartService.getPromoPercentage(this.cart);
    }
}
