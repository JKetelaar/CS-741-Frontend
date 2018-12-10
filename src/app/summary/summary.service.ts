import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Purchase} from '@app/models/Purchase';


const routes = {
    purchase: (c: PurchaseContext) => `/purchase/${c.id}`,
};

export interface PurchaseContext {
    id: number;
}


@Injectable()
export class SummaryService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Method to get the order summary.
     *
     * @param context - The purchase context with the id of the order.
     */
    getSummary(context: PurchaseContext): Observable<Purchase> {
        return this.httpClient
            .get(routes.purchase(context))
            .pipe(
                map((body: any) => body),
                catchError(() => null)
            );
    }

}
