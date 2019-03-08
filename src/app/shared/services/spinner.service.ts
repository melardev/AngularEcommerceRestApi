import {Injectable} from '@angular/core';

let CREATED = false;

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() {
    if (CREATED) {
      alert('Two instances of the same ShoppingCartService');
      return;
    }
    CREATED = true;
  }

  show() {

  }

  hide() {
    console.trace('hide spinner');
  }
}
