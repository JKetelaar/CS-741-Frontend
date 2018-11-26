/**
 * @author JKetelaar
 */
import {Product} from '@app/models/Product';

export interface Category {
    id: number;
    name: string;
    filename: string;
    products: Product[];
}
