import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {ErrorResult} from '../dtos/local/base';

export function buildErrorObservable(err: HttpErrorResponse | string | String): Observable<ErrorResult> {
  if (err instanceof HttpErrorResponse || err instanceof String) {
    return of(buildError(err));
  } else {
    debugger;
    return throwError(err);
  }
}

export function buildError(err: HttpErrorResponse | string | String): ErrorResult {
  if (err instanceof HttpErrorResponse) {
    const response = new ErrorResult();
    response.full_messages = [`Local error, details: ${err.message} `];
    return response;
  } else if (typeof err === 'string') {
    const response = new ErrorResult();
    response.full_messages = [`Local error, details: ${err} `];
    return response;
  } else {
    debugger;
  }
}
