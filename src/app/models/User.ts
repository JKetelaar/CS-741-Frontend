export interface User {
    id: number;
    name: string;
    description: string;
    username: string;
    password: string;
    billingAddress: string;
    shippingAddress: string;
    roles: string[];
}

