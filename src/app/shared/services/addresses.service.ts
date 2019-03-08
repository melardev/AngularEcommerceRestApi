import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {NotificationService} from './notification.service';
import {AddressListResponseDto} from '../dtos/responses/addresses/addresses.dto';
import {catchError, map} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ErrorResult} from '../dtos/local/base';
import {buildErrorObservable} from '../utils/net.utils';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
    this.baseUrl = environment.urls.addresses;
  }

  fetchAll(): Observable<AddressListResponseDto | ErrorResult> {
    return this.httpClient.get<AddressListResponseDto | any>(this.baseUrl)
      .pipe(
        map(res => {
          if (res.success && res.addresses) {
            console.log('[+] Received ' + res.addresses.length + ' addresses');
          }
          return res as AddressListResponseDto;
        }), catchError(err => {
          return buildErrorObservable(err);
        }));
  }
}
