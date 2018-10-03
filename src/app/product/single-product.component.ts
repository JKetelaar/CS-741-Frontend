import {Component, OnInit} from '@angular/core';
import {Product} from '../models/Product';
import {ProductsService} from '@app/product/products.service';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-single-product',
    templateUrl: './single-product.component.html',
    styleUrls: ['./single-product.component.scss'],

})
export class SingleProductComponent implements OnInit {
    product: Product;
    id: number;

    constructor(private productsService: ProductsService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.productsService.getProduct({id: parseInt(this.route.snapshot.paramMap.get('id'), 10) })
            .pipe()
            .subscribe((product: Product) => {
                this.product = product;
                console.log(this.product);
            });
    }

}
