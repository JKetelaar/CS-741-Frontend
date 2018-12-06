import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CartService} from '@app/cart/cart.service';
import {UserService} from '@app/login/user.service';
import {PromotionService} from '@app/admin/promotion/promotion.service';
import {ProductsService} from '@app/product/products.service';
import {ProductManagementService} from '@app/admin/product-management/product-management.service';
import {ProductView} from '@app/models/ProductView';

export interface ChangeProductContext {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    promoPrice: number;
    promoFrom: Date;
    promoTo: Date;

}

@Component({
    selector: 'app-product-management',
    templateUrl: './product-management.component.html',
    styleUrls: ['./product-management.component.scss']
})

export class ProductManagementComponent implements OnInit {
    products: ProductView[];
    newProductForm: FormGroup;
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    promoPrice: number;
    promoFrom: Date;
    promoTo: Date;
    isValid: boolean;
    calendarOptions: any;

    /**
     * Converts DateTime to readable date.
     *
     * @param date - The date to be converted
     * @param withHours - Boolean whether to include the hours in the date
     * @param includeHours - Boolean whether to include the hours in the date
     */
    public static toReadableDate(date: Date, withHours: boolean = false, includeHours: boolean = true) {
        let readableDate =
            date.getFullYear() + '-' +
            ProductManagementComponent.pad(date.getMonth() + 1) + '-' +
            ProductManagementComponent.pad(date.getDate());

        if (includeHours) {
            readableDate += ' ' +
                (withHours ?
                    (ProductManagementComponent.pad(date.getHours()) + ':' +
                        ProductManagementComponent.pad(date.getMinutes()) + ':' +
                        ProductManagementComponent.pad(date.getSeconds()))
                    : '23:59:59');
        }

        return readableDate;
    }

    /**
     * Pads number n with a leading 0.
     *
     * @param n - The number to be padded
     */
    private static pad(n: number) {
        return n < 10 ? '0' + n : n;
    }

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private promotionService: PromotionService,
                private cartService: CartService,
                private userService: UserService,
                private productsService: ProductsService,
                private productManagementService: ProductManagementService
    ) {
        this.createProductForm();
        this.isValid = null;
        const dday = new Date(Date.now());
        dday.setDate(dday.getDate() - 1);
        this.calendarOptions = {
            displayFormat: 'MMM D[,] YYYY',
            barTitleFormat: 'MMMM YYYY',
            dayNamesFormat: 'dd',
            firstCalendarDay: 1,
            minDate: dday,
            barTitleIfEmpty: 'Click to select a date',
            placeholder: 'Click to select a date',
            addClass: 'form-control',
            useEmptyBarTitle: true,
        };
    }

    /**
     * Parses date to readable date.
     *
     * @param date - The date to be parsed.
     * @param includeHours - Boolean whether to include hours.
     */
    parseDate(date: string, includeHours: boolean = true) {
        const parsedDate = new Date(date);
        return ProductManagementComponent.toReadableDate(parsedDate, false, includeHours);
    }


    /**
     * Gets the current products
     */
    ngOnInit() {
        this.productsService.getProducts()
            .pipe()
            .subscribe((products: ProductView[]) => {
                this.products = products;
            });
    }

    /**
     * Method to clear the form.
     */
    clear() {
        this.id = null;
        this.name = null;
        this.description = null;
        this.price = null;
        this.quantity = null;
        this.promoPrice = null;
        this.promoFrom = null;
        this.promoTo = null;
    }

    /**
     * Method to create a new promotion.
     */
    create() {
        this.productManagementService.create(
            {
                id: this.id,
                name: this.name,
                description: this.description,
                price: this.price,
                quantity: this.quantity,
                promoPrice: this.promoPrice,
                promoFrom: this.promoFrom,
                promoTo: this.promoTo
            }
        ).subscribe(result => {
            result === 'Error, could not create product' ? this.isValid = false : this.isValid = true;
            this.loadProducts();
        });
    }

    /**
     * Edit product assoicated with the passed id.
     *
     * @param context - product to be edited.
     */
    edit(context: ChangeProductContext) {
        this.productManagementService.edit({
            id: context.id,
            name: context.name,
            description: context.description,
            price: context.price,
            quantity: context.quantity,
            promoPrice: context.promoPrice,
            promoFrom: context.promoFrom,
            promoTo: context.promoTo
        }).pipe().subscribe(() => {
            this.loadProducts();
        });
    }

    /**
     * Edit product assoicated with the passed id.
     *
     * @param id - id of product to be edited.
     */
    prepareToEdit(id: number) {
        this.productsService.getProduct({id: id}).pipe().subscribe(result => {
            this.id = result.id;
            this.name = result.name;
            this.quantity = result.quantity;
            this.description = result.description;
            this.price = result.price;
            this.promoPrice = result.promoPrice;
            this.promoFrom = result.promoFrom;
            this.promoTo = result.promoTo;
        });
    }


    /**
     * Deletes product assoicated with the passed id.
     *
     * @param id - id of product to be deleted.
     */
    delete(id: number) {
        this.productManagementService.delete({id: id}).pipe().subscribe(result => {
            this.loadProducts();
        });
    }

    /**
     * Gets current products.
     */
    loadProducts() {
        this.productsService.getProducts()
            .pipe()
            .subscribe((products: ProductView[]) => {
                this.products = products;
            });
    }

    /**
     * Method to create the form that the user submits in order to attempt to create product.
     */
    private createProductForm() {
        this.newProductForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }
}
