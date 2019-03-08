import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NotificationsDto, NotificationTypes} from '../dtos/local/notifications.dto';

let CREATED = false;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {
    if (CREATED) {
      alert('Two instances of the same NotificationService');
      return;
    }
    CREATED = true;
    this.messages = new BehaviorSubject(null);
  }


  private messages: BehaviorSubject<NotificationsDto>;

  getNotifications(): Observable<NotificationsDto> {
    return this.messages.asObservable();
  }

  dispatchSuccessMessage(message: string) {
    this.messages.next(new NotificationsDto(NotificationTypes.SUCCESS_TYPE, message));
  }

  dispatchErrorMessage(message: string) {
    this.messages.next(new NotificationsDto(NotificationTypes.ERROR_TYPE, message));
  }
}
