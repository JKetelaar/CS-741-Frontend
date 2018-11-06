import {User} from '@app/models/User';
import {Product} from '@app/models/Product';
import {OrderItem} from '@app/models/OrderItem';

export interface Cart {
    id: number;
    code: string;
    expirationDate: Date;
    percentage: number;
}
