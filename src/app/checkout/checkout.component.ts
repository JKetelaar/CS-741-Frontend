import {Component, OnInit} from '@angular/core';
import {CartService} from '@app/cart/cart.service';
import {Cart} from '@app/models/Cart';
import {OrderItem} from '@app/models/OrderItem';
import {UserService} from '@app/login/user.service';
import {User} from '@app/models/User';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
    cart: Cart;
    user: User;
    shippingSameAsBilling?: boolean;

    constructor(private cartService: CartService,
                private userService: UserService,
                ) {
        this.shippingSameAsBilling = null;
    }

    ngOnInit() {
        this.userService.getCurrentUser()
            .pipe()
            .subscribe((user: User) => {
                if (user !== null) {
                    this.user = user;
                }
            });

        this.cartService.getCart()
            .pipe()
            .subscribe((cart: Cart) => {
                this.cart = cart;
            });
    }


    getTotalCostForProduct(product: OrderItem) {
        return this.cartService.getTotalCostForProduct(product);
    }

    getTotalCost(): number {
        return this.cartService.getTotalCost(this.cart);
    }

    getOrderTotal(): number {
        return this.cartService.getOrderTotal(this.cart);
    }

    getTotalSavings(): number {
        return this.cartService.getTotalSavings(this.cart);
    }

    getPromoPercentage(): number {
        return this.cartService.getPromoPercentage(this.cart);
    }

    getPromoName(): string {
        return this.cartService.getPromoName(this.cart);
    }

}
