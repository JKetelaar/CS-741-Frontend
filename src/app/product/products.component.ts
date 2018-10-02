import {Component, OnInit} from '@angular/core';
import {ProductService} from '@app/product/product.service';
import {Product} from '../models/Product';
import {ProductView} from '@app/models/ProductView';


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],

})

@Component({
    selector: 'app-single-product',
    templateUrl: './single-product.component.html',
    styleUrls: ['./single-product.component.scss'],

})
export class ProductComponent implements OnInit {
    page = 1;
    products: ProductView[];

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.productService.getProducts()
            .pipe()
            .subscribe((products: ProductView[]) => {
                this.products = products;
            });
    }

}
