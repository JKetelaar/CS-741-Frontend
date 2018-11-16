import {Component, OnInit} from '@angular/core';
import {User} from '@app/models/User';
import {Cart} from '@app/models/Cart';
import {CartService} from '@app/cart/cart.service';
import {Purchase} from '@app/models/Purchase';
import {SummaryService} from '@app/summary/summary.service';
import {Product} from '@app/models/Product';
import {ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})

export class SummaryComponent implements OnInit {
    purchase: Purchase = null;

    constructor(private summaryService: SummaryService,
                private route: ActivatedRoute,
                ) {
    }


    ngOnInit() {
        this.summaryService.getSummary({id: parseInt(this.route.snapshot.paramMap.get('id'), 10)})
            .pipe()
            .subscribe((purchase: Purchase) => {
                this.purchase = purchase;
            });
    }



}
