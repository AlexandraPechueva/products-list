import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from 'src/app/models/products';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

interface DataSource {
  group: string;
  productName: string;
  productPrice: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(private _productsService: ProductsService) { }
  values$ = this._productsService.getProductsWithGroups();
  @ViewChild('productTable', { static: true }) table: MatTable<any>;

  private _products: Products[] = [];
  dataSource: DataSource[] = [];
  tableColumns: string[] = ['select', 'group', 'productName', 'productPrice'];
  selection = new SelectionModel<DataSource>(true, []);

  ngOnInit() {
    this._getProductsData();
  }

  private _getProductsData() {
    this._productsService.getProductsWithGroups().subscribe(response => this._updateProductsData(response));
  }

  private _updateProductsData(response: any) {
    this._products = response;
    this._getDataSource(this._products);
    this.table.renderRows();
  }

  private _getDataSource(products: Products[]): DataSource[] {
    products.forEach(product => {
      product.skus.forEach(skus => {
        this.dataSource.push(<DataSource>{
          group: product.group.name,
          productName: skus.name,
          productPrice: skus.price,
        })
      });
    });
    return this.dataSource;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

}