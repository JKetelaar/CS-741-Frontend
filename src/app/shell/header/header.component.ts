import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '@app/core';
import {UserService} from '@app/login/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  loggedIn: boolean = null;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }


  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], {replaceUrl: true}));
  }

  isLoggedIn(): boolean {
    if (this.loggedIn === null) {
      this.userService.getCurrentUser().subscribe(user => {
        this.loggedIn = user !== null;
      });
      this.loggedIn = false;
    }

    return this.loggedIn === true;
  }

}
