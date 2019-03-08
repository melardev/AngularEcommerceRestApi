import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject, Observable} from 'rxjs';

let CREATED = false;

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private roles: Array<string> = [];
  private user: BehaviorSubject<User>;
  private USER_KEY = 'auth-user';

  constructor(private storageService: LocalStorageService) {
    console.log('Jwt Service constructed');

    if (CREATED) {
      alert('Two instances of the same JwtService');
      return;
    }
    CREATED = true;

    const user = this.getUserSync();
    this.user = new BehaviorSubject(user);
  }


  getUser(): Observable<User> {
    return this.user;
  }

  public saveUser(user: User) {
    this.storageService.clear(this.USER_KEY);
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

  clearUser() {
    this.signOut();
  }

  signOut() {
    this.storageService.clear(this.USER_KEY);
    this.user.next(null);
  }

  public getRolesSync(): string[] {
    this.roles = [];
    if (this.storageService.get(this.USER_KEY)) {
      JSON.parse(sessionStorage.getItem(this.USER_KEY)).roles.forEach(role => {
        this.roles.push(role);
      });
    }
    return this.roles;
  }

}
