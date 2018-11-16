import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

const routes = {
    promotion: () => `/admin/orders/`,

};

@Injectable()
export class OrdersService {

    constructor(private httpClient: HttpClient) {
    }

    getOrders(): Observable<any[]> {
        return this.httpClient
            .get(routes.promotion())
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get orders'))
            );
    }

}
