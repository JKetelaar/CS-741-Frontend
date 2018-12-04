import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Cart} from '@app/models/Cart';
import {User} from '@app/models/User';
import {OrderItem} from '@app/models/OrderItem';

const routes = {
    cart: () => `/cart/`,
    add: (c: ProductContext) => `/cart/add`,
    delete: (c: ProductContext) => `/cart/delete`,
    adjust: (c: ProductContext) => `/cart/adjust`,
    clear: () => `/cart/clear`,

};

export interface ProductContext {
    id: number;
    quantity: number;
}

export interface AdjustContext {
    id: number;
    quantity: number;
}

export interface CartContext {
    id: number;
    products: OrderItem[];
    user?: User;
    guestId?: string;
}

@Injectable()
export class CartService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Returns the cart object.
     */
    getCart(): Observable<Cart> {
        return this.httpClient
        // .cache()
            .get(routes.cart())
            .pipe(
                map((body: any) => body),
                catchError(() => null)
            );
    }

    /**
     * Method to add a product to a cart.
     *
     * @param context - Product context containing the product id and quantity.
     */
    add(context: ProductContext) {
        let body = 'product=' + context.id;
        if (context.quantity != null) {
            body += '&quantity=' + context.quantity;
        }

        return this.httpClient
            .post(routes.add(context), body, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not add product'))
            );
    }

    /**
     * Method to clear the cart. Removes all items from the cart.
     */
    clear() {
        return this.httpClient
            .post(routes.clear(), null)
            .pipe(
                map((body: any) => body),
                catchError(() => 'Error, could not delete cart')
            );
    }

    /**
     * Method to delete a product from the cart.
     *
     * @param context - The product context containing the product id. Deletes all quanitites of an item
     * from the cart.
     */
    delete(context: ProductContext) {
        return this.httpClient
            .delete('/cart/delete?product=' + context.id, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not delete product'))
            );
    }

    /**
     * Method to adjust the quantity of a product in the cart.
     *
     * @param context - The adjust context containing the id of the product and the updated quantity.
     */
    adjust(context: AdjustContext) {
        return this.httpClient
            .put(routes.adjust(context), 'product=' + context.id + '&quantity=' + context.quantity, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not edit product'))
            );
    }

    /**
     * Method to get the total cost of the cart.
     *
     * @param cart - The cart object.
     */
    getTotalCost(cart: Cart): number {
        let total = 0;
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i];
            total += this.getTotalCostForProduct(product);
        }
        return parseFloat((total).toFixed(2));
    }

    /**
     * Returns the total cost before any promotions or discounts.
     *
     * @param cart - The cart object.
     */
    getOrderTotal(cart: Cart): number {
        return cart.finalPrice;
    }

    /**
     * Returns the total for a specific product including quantities but excluding promotions.
     *
     * @param product - An OrderItem object.
     */
    getTotalCostForProduct(product: OrderItem): number {
        return parseFloat((product.product.price * product.quantity).toFixed(2));
    }

    /**
     * Returns the total quantity of items in the cart.
     *
     * @ param cart - The cart object.
     */
    getTotal(cart: Cart): number {
        let total = 0;
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i];
            total += product.quantity;
        }
        return total;
    }

    /**
     * Returns the promo percentage of the cart.
     *
     * @ param cart - The cart object.
     */
    getPromoPercentage(cart: Cart): number {
        return cart.promotion == null ? 0 : cart.promotion.percentage;
    }

    /**
     * Returms the promotion code if exists.
     *
     * @param cart - The cart object with optional promotion applied.
     */
    getPromoName(cart: Cart): string {
        return cart.promotion == null ? '' : cart.promotion.code;
    }

    /**
     * Returns the total amount saved due to discounts or promotions.
     *
     * @param cart - The cart object.
     */
    getTotalSavings(cart: Cart): number {
        return parseFloat((this.getTotalCost(cart) - cart.finalPrice).toFixed(2));
    }
}
