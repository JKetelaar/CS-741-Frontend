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

    /**
     * Toggles if the menu is hidden.
     */
    toggleMenu() {
        this.menuHidden = !this.menuHidden;
    }

    /**
     * Method to logout and if successful redirects to the login.
     */
    logout() {
        this.authenticationService.logout()
            .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    }

    /**
     * Returns the logged in user's username if applicable.
     */
    get username(): string | null {
        const credentials = this.authenticationService.credentials;
        return credentials ? credentials.username : null;
    }

}
