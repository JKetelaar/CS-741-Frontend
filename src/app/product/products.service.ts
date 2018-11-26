import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Product} from '../models/Product';
import {ProductView} from '@app/models/ProductView';
import {ProductImage} from '@app/models/ProductImage';
import {environment} from '@env/environment';
import {Category} from '@app/models/Category';

const routes = {
    products: () => `/product/`,
    categories: () => `/category/`,
    productsFilter: (c: ProductByContext) => `/product/?orderby=${c.orderby}&limit=${c.limit}`,
    product: (c: ProductContext) => `/product/${c.id}`,
    searchProduct: (c: SearchProductContext) => `/product/?search=${c.searchItem}`,
};

export interface ProductContext {
    id: number;
}

export interface ProductByContext {
    orderby: string;
    limit: number;
}

export interface SearchProductContext {
    searchItem: string;
}

@Injectable()
export class ProductsService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Method to get all products in the system.
     */
    getProducts(): Observable<ProductView[]> {
        return this.httpClient
            .cache()
            .get(routes.products())
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get products'))
            );
    }

    /**
     * Method to get the products by a certain search criteria.
     *
     * @param context - context containing the orderby parameter.
     */
    getProductsBy(context: ProductByContext): Observable<ProductView[]> {
        return this.httpClient
            .cache()
            .get(routes.productsFilter(context))
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get products'))
            );
    }

    /**
     * Method to get a single product.
     *
     * @param context - Context containing the single product id.
     */
    getProduct(context: ProductContext): Observable<Product> {
        return this.httpClient
            .cache()
            .get(routes.product(context))
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get product'))
            );
    }

    /**
     * Method to search for a product.
     *
     * @param context - Context containing the search query as a stirng.
     */
    searchProduct(context: SearchProductContext): Observable<ProductView[]> {
        return this.httpClient
            .cache()
            .get(routes.searchProduct(context))
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not search products'))
            );
    }

    /**
     * Method to get the image url of a single product.
     *
     * @param product - The ProductView object containing a single image.
     */
    getImageURL(productImage: ProductImage): string {
        return environment.imageUrl + '/' + productImage.filename;
    }

    /**
     * Method to get all categories.
     */
    getCategories(): Observable<Category[]> {
        return this.httpClient
            .cache()
            .get(routes.categories())
            .pipe(
                map((body: any) => body),
                catchError(() => of('Error, could not get categories'))
            );
    }
}
