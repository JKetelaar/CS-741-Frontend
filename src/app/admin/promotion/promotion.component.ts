import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CartService} from '@app/cart/cart.service';
import {Promotion} from '@app/models/Promotion';
import {UserService} from '@app/login/user.service';
import {User} from '@app/models/User';
import {PromotionService} from '@app/admin/promotion/promotion.service';

@Component({
    selector: 'app-promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.scss']
})

export class PromotionComponent implements OnInit {
    promotions: Promotion[];
    createPromoForm: FormGroup;
    code: string;
    expirationDate: Date;
    percentage: number;
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
            PromotionComponent.pad(date.getMonth() + 1) + '-' +
            PromotionComponent.pad(date.getDate());

        if (includeHours) {
            readableDate += ' ' +
                (withHours ?
                    (PromotionComponent.pad(date.getHours()) + ':' +
                        PromotionComponent.pad(date.getMinutes()) + ':' +
                        PromotionComponent.pad(date.getSeconds()))
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
                private userService: UserService
    ) {
        this.createPromotionForm();
        this.isValid = null;
        this.calendarOptions = {
            displayFormat: 'MMM D[,] YYYY',
            barTitleFormat: 'MMMM YYYY',
            dayNamesFormat: 'dd',
            firstCalendarDay: 1,
            minDate: new Date(Date.now()),
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
        return PromotionComponent.toReadableDate(parsedDate, false, includeHours);
    }

    /**
     * Gets the current user and routes them to the home page if the user is registered and not an admin.
     */
    ngOnInit() {
        this.userService.getCurrentUser()
            .pipe()
            .subscribe((user: User) => {
                if (user === null || user.roles[0] !== 'ROLE_ADMIN') {
                    this.router.navigate(['home']);
                }
            });

        this.loadPromotions();
    }

    /**
     * Gets current promotions.
     */
    loadPromotions() {
        this.promotionService.getPromotions()
            .pipe()
            .subscribe((promotions: Promotion[]) => {
                this.promotions = promotions;
            });
    }

    /**
     * Method to create a new promotion.
     */
    create() {
        this.promotionService.create(
            {code: this.code, percentage: this.percentage, expirationDate: this.expirationDate}
        ).subscribe(result => {
            result === 'Error, could not create promotion' ? this.isValid = false : this.isValid = true;

            this.loadPromotions();
        });
    }

    /**
     * Deletes promotion assoicated with the passed id.
     *
     * @param id - id of promotion to be deleted.
     */
    delete(id: number) {
        this.promotionService.delete({id: id}).pipe().subscribe(result => {
            this.loadPromotions();
        });
    }

    /**
     * Promotion code to be applied to the cart.
     *
     * @param code - the code to be applied.
     */
    apply(code: string) {
        this.promotionService.apply({code: code}).pipe().subscribe();
    }

    /**
     * Method to create the form that the user submits in order to attempt to apply promotion.
     */
    private createPromotionForm() {
        this.createPromoForm = this.formBuilder.group({
            code: ['', Validators.required],
            expirationDate: ['', Validators.required],
            percentage: ['', Validators.required],
        });
    }
}
