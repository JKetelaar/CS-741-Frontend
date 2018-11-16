import {Component, OnInit} from '@angular/core';
import {CartService} from '@app/cart/cart.service';
import {Cart} from '@app/models/Cart';
import {OrderItem} from '@app/models/OrderItem';
import {UserService} from '@app/login/user.service';
import {User} from '@app/models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckoutService} from '@app/checkout/checkout.service';
import {OrderAddress} from '@app/models/OrderAddress';
import {Purchase} from '@app/models/Purchase';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
    cart: Cart = null;
    user: User = null;
    loaded = false;
    orderForm: FormGroup;
    shippingAddress: OrderAddress = null;
    billingAddress: OrderAddress = null;
    isValid: boolean;
    purchase: Purchase = null;


    constructor(private cartService: CartService,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private checkoutService: CheckoutService,
    ) {
        this.createOrderForm();
        this.isValid = null;

    }

    placeOrder() {
        this.checkoutService.placeOrder({shippingAddress: this.shippingAddress, billingAddress: this.billingAddress})
            .subscribe(result => {
                if (result != null) {
                    this.purchase = result;
                }
            });
    }

    ngOnInit() {
        this.userService.getCurrentUser()
            .pipe()
            .subscribe((user: User) => {
                if (user !== null) {
                    this.user = user;
                }

                this.cartService.getCart()
                    .pipe()
                    .subscribe((cart: Cart) => {
                        this.cart = cart;
                        this.loaded = true;
                        this.createAddresses();
                    });
            });
    }

    order(id: number) {
        this.checkoutService.order({id: id})
            .pipe()
            .subscribe(result => {
                // TODO: Tank you
                window.location.href = '/home';
            });
    }

    createAddresses() {
        if (this.user !== null) {
            if (this.user.billingAddress !== null) {
                this.billingAddress = this.user.billingAddress;
            }
            if (this.user.shippingAddress !== null) {
                this.shippingAddress = this.user.shippingAddress;
            }
        }

        if (this.billingAddress === null) {
            this.billingAddress = new class implements OrderAddress {
                address: string;
                city: string;
                fullname: string;
                instructions: string;
                phoneNumber: string;
                secondaryAddress: string;
                state: string;
                type: string;
                zipCode: string;
            };
        }

        if (this.shippingAddress === null) {
            this.shippingAddress = new class implements OrderAddress {
                address: string;
                city: string;
                fullname: string;
                instructions: string;
                phoneNumber: string;
                secondaryAddress: string;
                state: string;
                type: string;
                zipCode: string;
            };
        } else {
        }
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

    private createOrderForm() {
        this.orderForm = this.formBuilder.group({
            shippingAddress: ['', Validators.required],
            billingAddress: true
        });
    }

}
