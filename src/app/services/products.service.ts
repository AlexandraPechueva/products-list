import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoute } from '../constants/api-url';
import { Products } from '../models/products';

enum ApiMethod {
  routeToValuesWithParents = '/GetWithParent',
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getProductsWithGroups(): Observable<Products[]> {
    return this._http.get<Products[]>(ApiRoute + ApiMethod.routeToValuesWithParents);
  }
}
