import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from '../services/users.service';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: UsersService) {
  }

  canActivate() {
    if (this.authService.isLoggedInSync() && this.authService.isAdminSync()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
