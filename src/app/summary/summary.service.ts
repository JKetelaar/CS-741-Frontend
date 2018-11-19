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

    getSummary(context: PurchaseContext): Observable<Purchase> {
        return this.httpClient
            .get(routes.purchase(context))
            .pipe(
                map((body: any) => body),
                catchError(() => null)
            );
    }

}
