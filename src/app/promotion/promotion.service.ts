import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Promotion} from '@app/models/Promotion';

const routes = {
    promotion: () => `/admin/promotion/`,
    apply: (c: PromotionContext) => '/admin/promotion/apply',
    delete: (c: DeletePromotionContext) => `/admin/promotion/${c.id}`,
    create: (c: CreatePromotionContext) => '/admin/promotion/new'

};

export interface DeletePromotionContext {
    id: number;
}

export interface PromotionContext {
    code: string;
}

export interface CreatePromotionContext {
    code: string;
    expirationDate: Date;
    percentage: number;
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

    getPromotions(): Observable<Promotion[]> {
        return this.httpClient
            .get(routes.promotion())
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get promotions'))
            );
    }

    delete(context: DeletePromotionContext) {
        return this.httpClient
            .delete(routes.delete(context), {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not delete promotion'))
            );
    }

    create(context: CreatePromotionContext): Observable<string> {
        return this.httpClient
            .post(routes.create(context),
                'code=' + encodeURI(context.code) +
                '&percentage=' + context.percentage +
                '&expirationDate=' + context.expirationDate,
                {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }
            )
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not create promotion'))
            );
    }

}
