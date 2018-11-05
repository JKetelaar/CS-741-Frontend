import { Component, OnInit } from '@angular/core';
import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';
import {CartService} from '@app/cart/cart.service';
import {HeaderComponent} from '@app/shell/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    latestProducts: ProductView[];

    constructor(private productsService: ProductsService,
                private cartService: CartService,
                private header: HeaderComponent) {
    }

    ngOnInit() {
        this.productsService.getProductsBy({orderby: 'creationDate', limit: 4  })
            .pipe()
            .subscribe((products: ProductView[]) => {
              console.log(products)
                this.latestProducts = products;
            });
    }

    addToCart(id: number) {
        this.cartService.add({id: id}).pipe().subscribe(() => {
            this.header.refreshCart(true);
        });
    }
}
