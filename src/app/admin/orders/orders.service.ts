import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

const routes = {
    orders: () => `/admin/purchase/`,
    order: (o: OrderContext) => `/admin/purchase/${o.id}`,
};

export interface OrderContext {
    id: number;
}

@Injectable()
export class OrdersService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Method to get the current orders.
     */
    getOrders(): Observable<any[]> {
        return this.httpClient
            .get(routes.orders())
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get orders'))
            );
    }

    /**
     * Method to get a specific order by the order id.
     *
     * @param context - Order context containing the id of the order to be retrieved.
     */
    getOrder(context: OrderContext): Observable<any> {
        return this.httpClient
            .get(routes.order(context))
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get orders'))
            );
    }

}
