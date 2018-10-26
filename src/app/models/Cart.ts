import {User} from '@app/models/User';
import {Product} from '@app/models/Product';

export interface Cart {
    id: number;
    products: Product[];
    user?: User;
    guestId?: string;
}
