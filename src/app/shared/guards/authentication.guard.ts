import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '../services/users.service';

let CREATED = false;

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authService: UsersService) {
    if (CREATED) {
      alert('Two instances of the same AuthenticationGuard');
      return;
    }
    CREATED = true;
    this.authService.isLoggedInAsync().subscribe(isLoggedIn => {

    });
  }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.isLoggedInSync()) {
      return true;
    }
    this.router.navigate(['/index/login'], {
      queryParams: {returnUrl: state.url}
    });
    return false;
  }
}
