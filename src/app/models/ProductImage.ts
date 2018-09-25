import {Product} from './Product';

export interface ProductImage {
    id: number;
    path: string;
    date: Date;
    product: Product;
}
