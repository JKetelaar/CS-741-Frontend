import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PromotionService} from '@app/promotion/promotion.service';
import {CartService} from '@app/cart/cart.service';
import {Promotion} from '@app/models/Promotion';
import {UserService} from '@app/login/user.service';
import {User} from '@app/models/User';

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

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private promotionService: PromotionService,
                private cartService: CartService,
                private userService: UserService
    ) {
        this.createPromotionForm();
        this.isValid = null;
    }

    ngOnInit() {
        this.userService.getCurrentUser()
            .pipe()
            .subscribe((user: User) => {
                if (user === null || user.roles[0] !== 'ROLE_ADMIN') {
                    this.router.navigate(['home']);
                }
            });

        this.promotionService.getPromotions()
            .pipe()
            .subscribe((promotions: Promotion[]) => {
                this.promotions = promotions;
            });
    }

    create() {
        this.promotionService.create(
            {code: this.code, percentage: this.percentage, expirationDate: this.expirationDate}
        ).subscribe(result => {
            result === 'Error, could not create promotion' ? this.isValid = false : this.isValid = true;
        });
    }

    delete(id: number) {
        this.promotionService.delete({id: id}).pipe().subscribe(result => {
            window.location.reload();
        });
    }

    apply(code: string) {
        this.promotionService.apply({code: code}).pipe().subscribe();
    }

    private createPromotionForm() {
        this.createPromoForm = this.formBuilder.group({
            code: ['', Validators.required],
            expirationDate: ['', Validators.required],
            percentage: ['', Validators.required],
        });
    }
}
