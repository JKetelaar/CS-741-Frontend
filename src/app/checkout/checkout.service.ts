import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const routes = {
    checkout: () => `/checkout/`,

};



@Injectable()
export class CheckoutService {

    constructor(private httpClient: HttpClient) {
    }
}
