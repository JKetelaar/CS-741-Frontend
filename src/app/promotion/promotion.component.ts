import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@app/login/user.service';
import {AuthenticationService} from '@app/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.scss']
})

export class PromotionComponent implements OnInit {

    createPromoForm: FormGroup;
    code: string;
    expirationDate: Date;
    percentage: number;
    isValid: boolean;


    constructor(private router: Router,
                private formBuilder: FormBuilder,
              ) {
        this.createPromotionForm();
        this.isValid = null;
    }

    ngOnInit() {
    }

    create() {
        // this.service.register
        console.log(this.code);
        console.log(this.expirationDate);
        console.log(this.percentage);
        this.isValid = true;
    }


    private createPromotionForm() {
        this.createPromoForm = this.formBuilder.group({
            code: ['', Validators.required],
            expirationDate: ['', Validators.required],
            percentage: ['', Validators.required],
        });
    }
}
