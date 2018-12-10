import {User} from '@app/models/User';
import {OrderItem} from '@app/models/OrderItem';
import {Promotion} from '@app/models/Promotion';

export interface Cart {
    changed: number;
    id: number;
    products: OrderItem[];
    user?: User;
    guestId?: string;
    finalPrice: number;
    promotion?: Promotion;
}
