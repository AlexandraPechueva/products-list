import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from 'src/app/models/products';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

interface DataSource {
  group: string;
  productName: string;
  productPrice: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(private _productsService: ProductsService) { }

  @ViewChild('table', { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private _products: Products[] = [];
  private _preparedData: DataSource[] = [];
  tableColumns: string[] = ['select', 'group', 'productName', 'productPrice'];
  groups: string[] = []
  selection = new SelectionModel<DataSource>(true, []);
  dataSource = new MatTableDataSource(this._preparedData);

  ngOnInit() {
    this._getData();
  }

  private _getGroups(products: Products[]) {
    this.groups = products.map(product => {
      return product.group.name
    });
  }

  private _resetDateSourceFilter() {
    this.dataSource.filter = '';
    this.dataSource.filteredData = [];
  }

  private _getData() {
    this._productsService.getProductsWithGroups().subscribe(response => {
      this._getDataSource(response);
      this.dataSource.sort = this.sort;
      this._getGroups(this._products);
    });
  }

  private _getDataSource(response: any) {
    this._products = response;
    this._prepareDataForTable(this._products);
  }

  private _prepareDataForTable(products: Products[]): DataSource[] {
    products.forEach(product => {
      product.skus.forEach(skus => {
        this._preparedData.push(<DataSource>{
          group: product.group.name,
          productName: skus.name,
          productPrice: skus.price,
        })
      });
    });

    return this._preparedData;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this._resetDateSourceFilter();
      return;
    }

    this.dataSource.filterPredicate = (data: DataSource, filterValue: string) => {
      return data.group
        .trim()
        .toLowerCase().indexOf(filterValue.trim().toLowerCase()) >= 0;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}