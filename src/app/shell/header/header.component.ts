import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/core';
import {CookieService} from 'ngx-cookie-service';
import {Cart} from '@app/models/Cart';
import {CartService} from '@app/cart/cart.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
    cart: Cart;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private cartService: CartService
              ) { }

  ngOnInit() {
      this.cartService.getCart()
          .pipe()
          .subscribe((cart: Cart) => {
              this.cart = cart;
          });
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }


  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    // const credentials = this.authenticationService.credentials;
    // return credentials ? credentials.username : null;
    const username = this.cookieService.get('username');
    return username !== null && username.length > 0 ? username : null;
  }

  getTotalCost(): number {
      let total = 0;
      for (let i = 0; i < this.cart.products.length; i++) {
          const product = this.cart.products[i];
          total += (product.price * product.quantity);
      }
      return total;
  }

  getTotal(): number {
      let total = 0;
      for (let i = 0; i < this.cart.products.length; i++) {
          const product = this.cart.products[i];
          total += product.quantity;
      }
      return total;
  }

}
