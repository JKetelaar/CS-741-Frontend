import {Component, OnInit} from '@angular/core';
import {ProductService} from '@app/product/product.service';
import {Product} from '../../../models/Product';


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    products: Product[];

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.productService.getProducts()
            .pipe()
            .subscribe((products: Product[]) => {
                this.products = products;
            });
    }

}
