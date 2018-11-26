import {Component, OnInit} from '@angular/core';
import {ProductView} from '@app/models/ProductView';
import {ProductsService} from '@app/product/products.service';
import {CartService} from '@app/cart/cart.service';
import {HeaderComponent} from '@app/shell/header/header.component';
import {Category} from '@app/models/Category';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    categeries: Category[];
    latestProducts: ProductView[];

    constructor(private productsService: ProductsService,
                private cartService: CartService,
                private header: HeaderComponent) {
    }

    ngOnInit() {
        this.productsService.getProductsBy({orderby: 'creationDate', limit: 4})
            .pipe()
            .subscribe((products: ProductView[]) => {
                this.latestProducts = products;
            });

        this.productsService.getCategories()
            .pipe()
            .subscribe((categories: Category[]) => {
                this.categeries = categories.splice(0, 3);
                console.log(this.categeries);
            });
    }

    /**
     * Method to add product to cart.
     *
     * @param id - Id of the item to be added to the cart.
     */
    addToCart(id: number) {
        this.cartService.add({id: id, quantity: null}).pipe().subscribe(() => {
            this.header.refreshCart(true);
        });
    }

    /**
     * Method to get the image url of a single product.
     *
     * @param product - The ProductView object containing a single image.
     */
    getImageURL(product: ProductView): string {
        return this.productsService.getImageURL(product.singleImage);
    }
}
