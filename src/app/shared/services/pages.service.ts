import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Tag} from '../models/tag.model';
import {Category} from '../models/category.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {BaseAppDtoResponse, ErrorAppDtoResponse} from '../dtos/responses/shared/base.dto';
import {buildErrorObservable} from '../utils/net.utils';

class HomeResponseDto extends BaseAppDtoResponse {
  tags: Tag[];
  categories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private baseUrl: { about: string; home: string };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.urls.pages;
  }

  fetchHome(): Observable<HomeResponseDto | ErrorAppResponseDto> {
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
