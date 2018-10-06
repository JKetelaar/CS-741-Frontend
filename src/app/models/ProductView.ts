import {ProductImage} from '@app/models/ProductImage';

export interface ProductView {
    id: number;
    name: string;
    description: string;
    price: number;
    finalPrice: number;
    singleImage: ProductImage;
}
