import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {buildErrorObservable} from '../utils/net.utils';
import {ErrorResult} from '../dtos/local/base';
import {HomeResponseDto} from '../dtos/responses/pages/home.dto';


@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private baseUrl: { about: string; home: string };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.urls.pages;
  }

  fetchHome(): Observable<HomeResponseDto | ErrorResult> {
    return this.httpClient.get<HomeResponseDto>(this.baseUrl.home).pipe(
      map(res => {
        if (res.success) {
          console.log('[+] Fetched home successfully');
        }
        return res;
      }),
      catchError(err => buildErrorObservable(err))
    );
  }


}
