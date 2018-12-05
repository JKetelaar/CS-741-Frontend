import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PromotionComponent} from '@app/admin/promotion/promotion.component';

const routes = {
    product: () => `/product/`,
    create: (c: ChangeProductContext) => '/admin/product/new',
    edit: (c: ChangeProductContext) => `/admin/product/${c.id}/edit`,
    delete: (c: ProductContext) => `/admin/product/${c.id}`,
};

export interface ProductContext {
    id: number;
}

export interface ChangeProductContext {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    promoPrice: number;
    promoFrom: Date;
    promoTo: Date;
}

@Injectable()
export class ProductManagementService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Method to delete a product.
     *
     * @param context - The product context with id to be deleted.
     */
    delete(context: ProductContext) {
        return this.httpClient
            .delete(routes.delete(context), {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not delete product'))
            );
    }

    /**
     * Method to create a new product.
     *
     * @param context - The product context containing name ...
     */
    create(context: ChangeProductContext): Observable<string> {
        return this.httpClient
            .post(routes.create(context),
                'name=' + encodeURI(context.name) +
                '&price=' + encodeURI(context.price + '') +
                '&description=' + encodeURI(context.description) +
                '&quantity=' + encodeURI(context.quantity + '') +
                '&promoPrice=' + encodeURI(context.promoPrice + '') +
                '&promoFrom=' + PromotionComponent.toReadableDate(context.promoFrom, false) +
                '&promoTo=' + PromotionComponent.toReadableDate(context.promoTo, false),
                {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }
            )
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not create promotion'))
            );
    }

    /**
     * Method to edit a product.
     *
     * @param context - The product context with id to be edit.
     */
    edit(context: ChangeProductContext) {
        return this.httpClient
            .post(routes.edit(context),
                'name=' + encodeURI(context.name) +
                '&price=' + encodeURI(context.price + '') +
                '&description=' + encodeURI(context.description) +
                '&quantity=' + encodeURI(context.quantity + '') +
                '&promoPrice=' + encodeURI(context.promoPrice + '') +
                '&promoFrom=' + PromotionComponent.toReadableDate(context.promoFrom, false) +
                '&promoTo=' + PromotionComponent.toReadableDate(context.promoTo, false),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }
            )
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not delete product'))
            );
    }

}
