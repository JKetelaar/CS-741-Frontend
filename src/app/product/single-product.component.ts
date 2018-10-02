import {Component, OnInit} from '@angular/core';
import {Product} from '../models/Product';
import {SingleProductContext, SingleProductService} from './single-product.service';


@Component({
    selector: 'app-single-product',
    templateUrl: './single-product.component.html',
    styleUrls: ['./single-product.component.scss'],

})
export class SingleProductComponent implements OnInit {
    product: Product;
    id: number;
    constructor(private singleProductService: SingleProductService) {
    }

    ngOnInit() {
        this.singleProductService.getProduct(this.product)
            .pipe()
            .subscribe((product: Product) => {
                console.log(this.product.id)
                this.product = product;
            });
    }

}
