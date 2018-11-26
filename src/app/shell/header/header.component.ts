import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '@app/core';
import {CookieService} from 'ngx-cookie-service';
import {Cart} from '@app/models/Cart';
import {CartService} from '@app/cart/cart.service';
import {UserService} from '@app/login/user.service';
import {User} from '@app/models/User';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    searchQuery: string;
    menuHidden = true;
    loggedIn: boolean = null;
    cart: Cart;
    admin = false;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private cookieService: CookieService,
                private cartService: CartService,
                private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.userService.getCurrentUser()
            .pipe()
            .subscribe((user: User) => {
                if (user !== null && user.roles[0] === 'ROLE_ADMIN') {
                    this.admin = true;
                }
            });
        this.loadCart();
    }

    /**
     * Method to refresh the cart for front end reasons.
     */
    loadCart() {
        this.refreshCart(false);
    }

    /**
     * Method to retrieve the cart.
     *
     * @param reload - Whether or not to refresh the page after the cart has been reloaded.
     */
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

    /**
     * Method to toggle the menu.
     */
    toggleMenu() {
        this.menuHidden = !this.menuHidden;
    }

    /**
     * Method to logout.
     */
    logout() {
        this.authenticationService.logout()
            .subscribe(() => this.router.navigate(['/login'], {replaceUrl: true}));
    }

    /**
     * Method to check whether a user is logged in or is a guest.,
     */
    isLoggedIn(): boolean {
        if (this.loggedIn === null) {
            this.userService.getCurrentUser().subscribe(user => {
                this.loggedIn = user !== null;
            });
            this.loggedIn = false;
        }

        return this.loggedIn === true;
    }

    /**
     * Method to get the total cost of a cart.
     */
    getTotalCost(): number {
        return this.cartService.getTotalCost(this.cart);
    }

    /**
     * Method to get the total quantity of items in a cart.
     */
    getTotal(): number {
        return this.cartService.getTotal(this.cart);
    }

    /**
     * Method to search for a product with specific search query.
     */
    search() {
        this.router.navigate(['search/result/' + this.searchQuery]);
        window.location.reload(); // Avoids loading cached page
    }
}
