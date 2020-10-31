import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';

export const ApiConstants = Object.freeze({
  getDishCategory: "v2/5dfccffc310000efc8d2c1ad"
})

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ExecuteGet(url: string, urlParam?: string, queryParams?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.get(url, { params: queryParams });
  }

}
