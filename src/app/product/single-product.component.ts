import {Component, OnInit} from '@angular/core';
import {Product} from '../models/Product';
import {ProductsService} from '@app/product/products.service';
import {ActivatedRoute} from '@angular/router';
import {ProductImage} from '@app/models/ProductImage';
import {CartService} from '@app/cart/cart.service';
import {HeaderComponent} from '@app/shell/header/header.component';
import {SlickModule} from 'ngx-slick';


@Component({
    selector: 'app-single-product',
    templateUrl: './single-product.component.html',
    styleUrls: ['./single-product.component.scss'],

})
export class SingleProductComponent implements OnInit {
    product: Product;
    id: number;

    slideConfig = {'slidesToShow': 1, 'slidesToScroll': 1};

    constructor(private productsService: ProductsService,
                private cartService: CartService,
                private route: ActivatedRoute,
                private header: HeaderComponent,
                private slick: SlickModule) {
    }

    ngOnInit() {
        this.productsService.getProduct({id: parseInt(this.route.snapshot.paramMap.get('id'), 10)})
            .pipe()
            .subscribe((product: Product) => {
                this.product = product;
            });
    }

    getImageURL(image: ProductImage): string {
        return this.productsService.getImageURL(image);
    }

    addToCart(id: number) {
        this.cartService.add({id: id}).pipe().subscribe(() => {
            this.header.refreshCart(true);
        });
    }
}
