import {Injectable} from '@angular/core';

let CREATED = false;
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements IStorageService {

  constructor() {
    console.log('Jwt Service constructed');

    if (CREATED) {
      alert('Two instances of the same LocalStorageService');
      return;
    }
    CREATED = true;
  }

  get(key: string) {
    return window.localStorage[key];
  }

  set(key: string, value: string) {
    window.localStorage[key] = value;
  }

  clear(key: string) {
    window.localStorage.removeItem(key);
  }
}
