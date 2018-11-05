import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '@app/core';
import {CookieService} from 'ngx-cookie-service';
import {Cart} from '@app/models/Cart';
import {CartService} from '@app/cart/cart.service';
import {UserService} from '@app/login/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuHidden = true;
    loggedIn: boolean = null;
    cart: Cart;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private cookieService: CookieService,
                private cartService: CartService,
                private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.loadCart();
    }

    loadCart() {
        this.refreshCart(false);
    }

    refreshCart(reload: boolean) {
        this.cartService.getCart()
            .pipe()
            .subscribe((cart: Cart) => {
                this.cart = cart;
                if (reload) {
                    window.location.reload();
                }
            });
    }

    toggleMenu() {
        this.menuHidden = !this.menuHidden;
    }


    logout() {
        this.authenticationService.logout()
            .subscribe(() => this.router.navigate(['/login'], {replaceUrl: true}));
    }

    isLoggedIn(): boolean {
        if (this.loggedIn === null) {
            this.userService.getCurrentUser().subscribe(user => {
                this.loggedIn = user !== null;
            });
            this.loggedIn = false;
        }

        return this.loggedIn === true;
    }

    getTotalCost(): number {
        return this.cartService.getTotalCost(this.cart);
    }

    getTotal(): number {
        return this.cartService.getTotal(this.cart);
    }

}
