import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer $token`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Methods': '*'
      }
    });
    return next.handle(request).pipe(
      tap(
        (ev: HttpEvent<any>) => {
          // TODO: manipulate data here
          if (ev instanceof HttpErrorResponse) {
            // Handle 401 here
            console.log('No authorisarion');
          }
        }
      )
    );
  }
}
