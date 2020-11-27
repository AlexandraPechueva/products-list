import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { ApiRoute } from '../constants/api-url';
import { Products } from '../models/products';

enum ApiMethod {
  routeToValuesWithParents = '/GetWithParent',
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /* получение данных от API
    constructor(private _http: HttpClient) { }
    getProductsWithGroups(): Observable<Products[]> {
      return this._http.get<Products[]>(ApiRoute + ApiMethod.routeToValuesWithParents);
    }
  */

  private tableData: Products[] = [
    {
      group: { id: 1, name: "КОРМ" },
      skus: [
        { id: 1, name: "Корм для черепах в виде китайских палочек", price: 545 },
        { id: 2, name: "Для золотых рыб", price: 165 },
        { id: 3, name: "Для тропических рыб", price: 316 },
      ]
    },

    {
      group: { id: 2, name: "Аквариумы" },
      skus: [
        { id: 4, name: "Аквариум прямоугольный", price: 2297 },
        { id: 5, name: "Террариум для черепах стеклянный", price: 1811 },
      ]
    },

    {
      group: { id: 3, name: "Аксессуары" },
      skus: [
        { id: 6, name: "Сифон Tetratec GC 40 (50-200 л)", price: 1239 },
        { id: 7, name: "Сачок Tetra №3 L (12см)", price: 105 },
        { id: 8, name: "Распылитель AS 25", price: 64 },
      ]
    },

    {
      group: { id: 4, name: "Декорация" },
      skus: [
        { id: 9, name: "Аквадекор Бочка 15x7x9 см, пластик, 505", price: 761 },
        { id: 10, name: "Декор для аквариумов Ардена малая, 15x10x6 см", price: 459 },
        { id: 11, name: "Декор для аквариумов Египетская пирамида, 22x22x14 см", price: 761 },
      ]
    }]

  getProductsWithGroups(): Observable<Products[]> {
    return of(this.tableData);
  }
}
