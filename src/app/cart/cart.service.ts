import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Cart} from '@app/models/Cart';
import {User} from '@app/models/User';
import {Product} from '@app/models/Product';
import {OrderItem} from '@app/models/OrderItem';

const routes = {
    cart: () => `/cart/`,
    add: (c: ProductContext) => `/cart/add`,
    delete: (c: ProductContext) => `/cart/delete`,
    adjust: (c: ProductContext) => `/cart/adjust`,

};

export interface ProductContext {
    id: number;
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
        return this.httpClient
            .post(routes.add(context), 'product=' + context.id, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not add product'))
            );
    }

    delete(context: ProductContext) {
        return this.httpClient
            .post(routes.delete(context), 'product=' + context.id, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not add product'))
            );
    }

    adjust(context: AdjustContext) {
        return this.httpClient
            .put(routes.adjust(context), 'product=' + context.id + '&quantity=' + context.quantity, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not add product'))
            );
    }
}
