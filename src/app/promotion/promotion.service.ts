import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Cart} from '@app/models/Cart';
import {User} from '@app/models/User';
import {Product} from '@app/models/Product';
import {OrderItem} from '@app/models/OrderItem';

const routes = {
    promotion: () => `/promotion/`,

};

@Injectable()
export class PromotionService {

    constructor(private httpClient: HttpClient) {
    }
}
