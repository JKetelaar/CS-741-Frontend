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
import {Router} from '@angular/router';

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
                private router: Router
    ) {
        this.createOrderForm();
        this.isValid = null;

    }

    /**
     * Method to place and order passing in the billing and shipping address.
     */
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

    /**
     * Method to place an order. Passes the id of the order and redirects to the summary page.
     *
     * @param id - id of the order.
     */
    order(id: number) {
        this.checkoutService.order({id: id})
            .pipe()
            .subscribe(result => {
                this.router.navigate(['/summary/' + id]);
            });
    }

    /**
     * Method that creates new OrderAddress object out of shipping and billing address.
     */
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

    /**
     * Returns the total cost for a specific product after discounts are applied.
     *
     * @param product - The product to get the total cost from.
     */
    getTotalCostForProduct(product: OrderItem) {
        return this.cartService.getTotalCostForProduct(product);
    }

    /**
     * Returns the total cost of the cart.
     */
    getTotalCost(): number {
        return this.cartService.getTotalCost(this.cart);
    }

    /**
     * Returns the order total after all discounts and promotions are applied.
     */
    getOrderTotal(): number {
        return this.cartService.getOrderTotal(this.cart);
    }

    /**
     * Returns the total savings (promotions and discounts) of an order.
     */
    getTotalSavings(): number {
        return this.cartService.getTotalSavings(this.cart);
    }

    /**
     * Returns promotion percentage if applicable.
     */
    getPromoPercentage(): number {
        return this.cartService.getPromoPercentage(this.cart);
    }

    /**
     * Returns the promotion code if applicable.
     */
    getPromoName(): string {
        return this.cartService.getPromoName(this.cart);
    }

    /**
     * Method to create the form that the user submits in order to attempt to create order.
     */
    private createOrderForm() {
        this.orderForm = this.formBuilder.group({
            shippingAddress: ['', Validators.required],
            billingAddress: true
        });
    }

}
