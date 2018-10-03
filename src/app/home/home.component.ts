import { Component, OnInit } from '@angular/core';
import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    latestProducts: ProductView[];

    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {
        this.productsService.getProductsBy({orderby: 'creationDate', limit: 4  })
            .pipe()
            .subscribe((products: ProductView[]) => {
              console.log(products)
                this.latestProducts = products;
            });
    }
}
