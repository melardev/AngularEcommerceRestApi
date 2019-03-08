import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UsersService} from '../services/users.service';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
  private token: string;

  constructor(private usersService: UsersService) {
    this.usersService.getUser().subscribe(user => {
      if (user && user.token) {
        this.token = user.token;
      } else {
        this.token = null;
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.token) {
      headersConfig['Authorization'] = `Bearer ${this.token}`;
    }

    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request);
  }
}
