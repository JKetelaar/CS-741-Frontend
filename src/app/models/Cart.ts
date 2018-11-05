import {User} from '@app/models/User';
import {Product} from '@app/models/Product';
import {OrderItem} from '@app/models/OrderItem';

export interface Cart {
    changed: number;
    id: number;
    products: OrderItem[];
    user?: User;
    guestId?: string;
}
