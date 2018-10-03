import {ProductImage} from './ProductImage';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    promoPrice: number;
    promoFrom: Date;
    promoTo: Date;
    active: boolean;
    images: ProductImage[];
    quantity: number;
    creationDate: Date;
    promo: boolean;
}

