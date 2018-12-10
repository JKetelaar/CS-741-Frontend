import {Component, OnInit} from '@angular/core';
import {CartService} from '@app/cart/cart.service';
import {Cart} from '@app/models/Cart';

import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';
import {HeaderComponent} from '@app/shell/header/header.component';
import {OrderItem} from '@app/models/OrderItem';
import {PromotionService} from '@app/admin/promotion/promotion.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cart: Cart;
    promoCode: string;
    isValid: boolean;


    constructor(private cartService: CartService,
                private productsService: ProductsService,
                private header: HeaderComponent,
                private promotionService: PromotionService) {
        this.isValid = null;
    }

    ngOnInit() {
        this.isValid = null;
        this.loadCart();
    }

    /**
     * Method to retrieve the current cart.
     */
    loadCart() {
        this.cartService.getCart()
            .pipe()
            .subscribe((cart: Cart) => {
                this.cart = cart;
            });
    }

    /**
     * Method to clear the current cart. This removes all items from cart
     */
    clear() {
        this.cartService.clear()
            .pipe().subscribe(() => {
            window.location.reload();
        });
    }

    /**
     * Method to apply a promotion to the cart.
     */
    apply() {
        this.promotionService.apply({code: this.promoCode}).pipe().subscribe(result => {
            result === 'Error, could not apply promotion' ? this.isValid = false : this.isValid = true;
            this.loadCart();
        });
    }

    /**
     * Method to add a product to the cart.
     *
     * @param id - The id of the product to be added to the cart.
     */
    add(id: number) {
        this.cartService.add({id: id, quantity: null}).pipe().subscribe(() => {
            this.loadCart();
            this.header.refreshCart(true);
        });
    }

    /**
     * Method to delete an item from the cart.
     *
     * @param id - The id of the product to be deleted from the cart.
     */
    delete(id: number) {
        this.cartService.delete({id: id, quantity: null}).pipe().subscribe(() => {
            this.loadCart();
            this.header.refreshCart(true);
        });
    }

    /**
     * Method to adjust the quantity of the item in the cart.
     *
     * @param id - The id of the product.
     * @param quantity - The new quantity of the product in the cart.
     */
    adjust(id: number, quantity: number) {
        this.cartService.adjust({id: id, quantity: quantity}).pipe().subscribe(() => {
            this.loadCart();
            this.header.refreshCart(true);
        });
    }

    /**
     * Returns the total cost before any promotions or discounts.
     */
    getTotalCost(): number {
        return this.cartService.getTotalCost(this.cart);
    }

    /**
     * Returns the total cost of the cart after promotions and discounts are applied.
     */
    getOrderTotal(): number {
        return this.cartService.getOrderTotal(this.cart);
    }

    /**
     * Returns the total quantity of items in the cart.
     */
    getTotal(): number {
        return this.cartService.getTotal(this.cart);
    }

    /**
     * Returns the total amount saved from discounts.
     */
    getTotalSavings(): number {
        return this.cartService.getTotalSavings(this.cart);
    }

    /**
     * Returns the total for a specific product including quantities but excluding promotions.
     *
     * @param product - An OrderItem object.
     */
    getTotalCostForProduct(product: OrderItem) {
        return this.cartService.getTotalCostForProduct(product);
    }

    /**
     * Returns the image url for a specific product.
     *
     * @param product - A ProductView object which contains a single image.
     */
    getImageURL(product: ProductView): string {
        return this.productsService.getImageURL(product.singleImage);
    }

    /**
     * Returns the promo percentage of the cart.
     */
    getPromoPercentage(): number {
        return this.cartService.getPromoPercentage(this.cart);
    }
}
