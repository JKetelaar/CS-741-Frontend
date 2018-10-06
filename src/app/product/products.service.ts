import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Product} from '../models/Product';
import {ProductView} from '@app/models/ProductView';
import {ProductImage} from '@app/models/ProductImage';
import {environment} from '@env/environment';

const routes = {
  products: () => `/product/`,
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

  getProducts(): Observable<ProductView[]> {
    return this.httpClient
      .cache()
      .get(routes.products())
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not get products'))
      );
  }

  getProductsBy(context: ProductByContext): Observable<ProductView[]> {
    return this.httpClient
      .cache()
      .get(routes.productsFilter(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not get products'))
      );
  }

  getProduct(context: ProductContext): Observable<Product> {
    return this.httpClient
      .cache()
      .get(routes.product(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not get product'))
      );
  }

  searchProduct(context: SearchProductContext): Observable<ProductView[]> {
    return this.httpClient
      .cache()
      .get(routes.searchProduct(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not search products'))
      );
  }

  getImageURL(productImage: ProductImage): string {
    return environment.imageUrl + '/' + productImage.filename;
  }
}
