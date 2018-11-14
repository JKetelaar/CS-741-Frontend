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

    getCart(): Observable<Cart> {
        return this.httpClient
        // .cache()
            .get(routes.cart())
            .pipe(
                map((body: any) => body),
                catchError(() => null)
            );
    }

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

    clear() {
        return this.httpClient
            .post(routes.clear(), null)
            .pipe(
                map((body: any) => body),
                catchError(() => 'Error, could not delete cart')
            );
    }

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

    getTotalCost(cart: Cart): number {
        let total = 0;
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i];
            total += this.getTotalCostForProduct(product);
        }
        return parseFloat((total).toFixed(2));
    }

    getOrderTotal(cart: Cart): number {
        return cart.finalPrice;
    }

    getTotalCostForProduct(product: OrderItem): number {
        return parseFloat((product.product.price * product.quantity).toFixed(2));
    }

    getTotal(cart: Cart): number {
        let total = 0;
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i];
            total += product.quantity;
        }
        return total;
    }

    getPromoPercentage(cart: Cart): number {
        return cart.promotion == null ? 0 : cart.promotion.percentage;
    }

    getTotalSavings(cart: Cart): number {
        let total = 0;
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i];
            total += (product.quantity * product.product.promoPrice);
        }
        return total;
        return parseFloat((this.getTotalCost(cart) - total).toFixed(2));
    }
}