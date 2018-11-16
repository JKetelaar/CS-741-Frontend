import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, ObservableInput, of} from 'rxjs';
import {OrderAddress} from '@app/models/OrderAddress';
import {Purchase} from '@app/models/Purchase';

const routes = {
    checkout: () => `/purchase/new`,
    order: (c: FinalOrderContext) => `/purchase/complete/${c.id}`,

};

export interface FinalOrderContext {
    id: number;
}

export interface OrderContext {
    billingAddress: OrderAddress;
    shippingAddress: OrderAddress;
}


@Injectable()
export class CheckoutService {

    constructor(private httpClient: HttpClient) {
    }

    order(context: FinalOrderContext) {
        return this.httpClient
            .post(routes.order(context), 'id=' + context.id, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not complete order'))
            );

    }

    placeOrder(context: OrderContext): Observable<Purchase> {
        return this.httpClient
            .post(routes.checkout(),
                'billingAddress[fullname]=' + encodeURI(context.billingAddress.fullname) +
                '&billingAddress[type]=' + encodeURI(context.billingAddress.type) +
                '&billingAddress[address]=' + encodeURI(context.billingAddress.address) +
                '&billingAddress[secondaryAddress]=' + encodeURI(context.billingAddress.secondaryAddress) +
                '&billingAddress[city]=' + encodeURI(context.billingAddress.city) +
                '&billingAddress[state]=' + encodeURI(context.billingAddress.state) +
                '&billingAddress[zipCode]=' + encodeURI(context.billingAddress.zipCode) +
                '&billingAddress[phoneNumber]=' + encodeURI(context.billingAddress.phoneNumber) +
                '&billingAddress[instructions]=' + encodeURI(context.billingAddress.instructions) +
                '&shippingAddress[fullname]=' + encodeURI(context.shippingAddress.fullname) +
                '&shippingAddress[type]=' + encodeURI(context.shippingAddress.type) +
                '&shippingAddress[address]=' + encodeURI(context.shippingAddress.address) +
                '&shippingAddress[secondaryAddress]=' + encodeURI(context.shippingAddress.secondaryAddress) +
                '&shippingAddress[city]=' + encodeURI(context.shippingAddress.city) +
                '&shippingAddress[state]=' + encodeURI(context.shippingAddress.state) +
                '&shippingAddress[zipCode]=' + encodeURI(context.shippingAddress.zipCode) +
                '&shippingAddress[phoneNumber]=' + encodeURI(context.shippingAddress.phoneNumber) +
                '&shippingAddress[instructions]=' + encodeURI(context.shippingAddress.instructions),
                {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }
            )
            .pipe(
                map((body: any) => body),
                catchError(() => of('Could not create purchase'))
            );
    }
}
