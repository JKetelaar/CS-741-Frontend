import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '@app/cart/cart.service';
import {UserService} from '@app/login/user.service';
import {User} from '@app/models/User';
import {OrdersService} from '@app/admin/orders/orders.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
    order: any = null;
    orderId: number;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private promotionService: OrdersService,
                private cartService: CartService,
                private userService: UserService,
                private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.orderId = +this.route.snapshot.paramMap.get('id');

        this.userService.getCurrentUser()
            .pipe()
            .subscribe((user: User) => {
                if (user === null || user.roles[0] !== 'ROLE_ADMIN') {
                    this.router.navigate(['home']);
                }
            });

        this.loadOrder();
    }

    loadOrder() {
        this.promotionService.getOrder({id: this.orderId})
            .pipe()
            .subscribe((order: any) => {
                this.order = order;
            });
    }
}
