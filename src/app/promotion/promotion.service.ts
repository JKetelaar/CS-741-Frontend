import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Cart} from '@app/models/Cart';
import {User} from '@app/models/User';
import {Product} from '@app/models/Product';
import {OrderItem} from '@app/models/OrderItem';
import {ProductContext} from '@app/cart/cart.service';

const routes = {
    promotion: () => `/promotion/`,
    apply: (c: PromotionContext) => '/promotion/apply'

};

export interface PromotionContext {
    code: string;
}

@Injectable()
export class PromotionService {

    constructor(private httpClient: HttpClient) {
    }

    apply(context: PromotionContext) {
        return this.httpClient
            .post(routes.apply(context), 'code=' + context.code, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not apply promotion'))
            );
    }
}
