import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {catchError, map, retry} from 'rxjs/operators';
import {ErrorResult} from '../dtos/local/base';
import {NotificationService} from './notification.service';
import {buildError, buildErrorObservable} from '../utils/net.utils';
import {LoginDtoResponse} from '../dtos/responses/users/auth.dto';
import {LoginRequestDto} from '../dtos/requests/login.dto';
import {LocalStorageService} from './local-storage.service';


let CREATED = false;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private isLoggedIn: boolean;
  private cachedUser: User;
  private user: BehaviorSubject<User>;
  private USER_KEY = 'auth-user';

  constructor(private storageService: LocalStorageService, private notificationService: NotificationService, private http: HttpClient) {
    if (CREATED) {
      alert('Two instances of the same UsersService');
      return;
    }

    CREATED = true;

    this.cachedUser = this.getUserSync();
    this.isLoggedIn = !!this.cachedUser;
    this.user = new BehaviorSubject(this.cachedUser);
  }

  login(credentials: LoginRequestDto): Observable<User | ErrorResult> {
    return this.http.post<LoginDtoResponse>(`${environment.urls.users}/login`, credentials)
      .pipe(retry(2), map(res => {

          if (res && res.success) {
            if (res.full_messages && Array.isArray(res.full_messages)
              && res.full_messages.length > 0) {
              this.notificationService.dispatchSuccessMessage(res.full_messages[0]);
            } else {
              this.notificationService.dispatchSuccessMessage('Logged in successfully');
            }

            const user: User = res.user;
            user.token = res.token;
            this.saveUser(res.user);
            return user;
          }

          return buildError('Unknown error while trying to login');
        }
      ), catchError(err => {
        this.notificationService.dispatchErrorMessage(err.message);
        return buildErrorObservable(err);
      }));
  }

  logout(): void {
    this.clearUser();
  }

  isLoggedInSync(): boolean {
    // return this.cachedUser != null && this.cachedUser.username !== null;
    return this.user.getValue() != null && this.user.getValue().username !== null;
  }

  isLoggedInAsync(): Observable<boolean> {
    return this.user.pipe(map(user => {
      if (user == null || user.username == null) {
        return false;
      }
      return true;
    }));
  }

  isAdminSync(): boolean {
    return this.user.getValue().roles.indexOf('ROLE_ADMIN') !== -1;
  }


  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  register(userInfo: Object): Observable<any> {
    return this.http.post<any>(`${environment.urls.users}`, userInfo);
  }

  isAdminAsync(): Observable<boolean> {
    return this.user.pipe(
      map(user => {
        if (user == null) {
          return false;
        }
        const rolesIntersection = user.roles.filter(role => -1 !== ['ROLE_ADMIN'].indexOf(role));
        return rolesIntersection.length >= 1;
      })
    );
  }

  public saveUser(user: User): void {
    this.storageService.clear(this.USER_KEY);
    this.cachedUser = user;
    this.storageService.set(this.USER_KEY, JSON.stringify(user));
    this.user.next(user);
  }


  private getUserSync(): User {
    const user = this.storageService.get(this.USER_KEY);
    if (user) {
      return JSON.parse(user) as User;
    }
    return null;
  }

  clearUser(): void {
    this.signOut();
  }

  signOut(): void {
    this.storageService.clear(this.USER_KEY);
    this.user.next(null);
  }

  public getRolesSync(): string[] {
    const roles = [];
    if (this.storageService.get(this.USER_KEY)) {
      JSON.parse(sessionStorage.getItem(this.USER_KEY)).roles.forEach(role => {
        roles.push(role);
      });
    }
    return roles;
  }

}
