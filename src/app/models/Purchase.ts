import {User} from '@app/models/User';
import {Product} from '@app/models/Product';
import {OrderAddress} from '@app/models/OrderAddress';

export interface Purchase {
    billingAddress: OrderAddress
    finalPrice: number;
    finalPriceWithoutTax: number;
    guestId: string;
    id: number;
    products: Product[];
    promotion: string;
    shippingAddress: OrderAddress;
    state: string;
    tax: number;
    user: User;
}
