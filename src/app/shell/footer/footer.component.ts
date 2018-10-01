import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    menuHidden = true;

    constructor(private router: Router,
                private authenticationService: AuthenticationService) { }

    ngOnInit() { }

    toggleMenu() {
        this.menuHidden = !this.menuHidden;
    }


    logout() {
        this.authenticationService.logout()
            .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    }

    get username(): string | null {
        const credentials = this.authenticationService.credentials;
        return credentials ? credentials.username : null;
    }

}
