import {OrderAddress} from '@app/models/OrderAddress';

export interface User {
    id: number;
    name: string;
    email: string;
    description: string;
    username: string;
    password: string;
    billingAddress: OrderAddress;
    shippingAddress: OrderAddress;
    roles: string[];
}

