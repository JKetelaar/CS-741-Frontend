import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '@app/core';
import {User} from '@app/models/User';
import {UserService} from '@app/login/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  user: User = null;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().pipe().subscribe((user: User) => {
      this.user = user;
    });
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], {replaceUrl: true}));
  }

}
