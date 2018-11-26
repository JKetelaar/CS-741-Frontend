import {Component, OnInit} from '@angular/core';
import {ProductsService} from '@app/product/products.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchQuery: string;

    constructor(private productsService: ProductsService, private router: Router) {
    }

    ngOnInit() {
    }

    /**
     * Method to search for the specific search query and redirect to result page.
     */
    search() {
        this.router.navigate(['search/result/' + this.searchQuery]);
    }
}
