import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {CartService} from '@app/cart/cart.service';
import {UserService} from '@app/login/user.service';
import {User} from '@app/models/User';
import {OrdersService} from '@app/admin/orders/orders.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
    orders: any[];

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private promotionService: OrdersService,
                private cartService: CartService,
                private userService: UserService
    ) {
    }

    ngOnInit() {
        this.userService.getCurrentUser()
            .pipe()
            .subscribe((user: User) => {
                if (user === null || user.roles[0] !== 'ROLE_ADMIN') {
                    this.router.navigate(['home']);
                }
            });

        this.loadOrders();
    }

    /**
     * Method to load the current orders.
     */
    loadOrders() {
        this.promotionService.getOrders()
            .pipe()
            .subscribe((orders: any[]) => {
                this.orders = orders;
            });
    }
}
