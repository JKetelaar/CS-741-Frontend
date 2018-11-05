import {Product} from '@app/models/Product';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    product: Product;
}
