import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Product} from '../models/Product';

const routes = {
    products: () => `https://reqres.in/api/products`,
    product: (c: ProductContext) => `/product/${c.id}`
};

export interface ProductContext {
    id: number;
}

@Injectable()
export class ProductService {

    constructor(private httpClient: HttpClient) {
    }

    getProducts(): Observable<Product[]> {
        return this.httpClient
            .cache()
            .get(routes.products())
            .pipe(
                map((body: any) => body.data),
                catchError(() => of('Error, could not get products'))
            );
    }

    getProduct(context: ProductContext): Observable<Product> {
        return this.httpClient
            .cache()
            .get(routes.product(context))
            .pipe(
                map((body: any) => body.value),
                catchError(() => of('Error, could not get products'))
            );
    }

}
