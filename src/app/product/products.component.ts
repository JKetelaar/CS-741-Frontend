import {Component, OnInit} from '@angular/core';
import {ProductsService} from '@app/product/products.service';
import {ProductView} from '@app/models/ProductView';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],

})

export class ProductsComponent implements OnInit {
  page = 1;
  products: ProductView[];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.getProducts()
      .pipe()
      .subscribe((products: ProductView[]) => {
        this.products = products;
      });
  }

  getImageURL(product: ProductView): string {
    return this.productsService.getImageURL(product.singleImage);
  }
}
