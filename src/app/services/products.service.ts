import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoute } from '../constants/api-url';

enum ApiMethod {
  routeToValuesWithParents = '/GetWithParent',
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getProductsWithGroups(): Observable<Object> {
    return this._http.get(ApiRoute + ApiMethod.routeToValuesWithParents);
  }
}
