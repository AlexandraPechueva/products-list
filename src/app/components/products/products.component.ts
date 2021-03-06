import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products, Group, Product } from 'src/app/models/products';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

interface DataSource {
  group: Group;
  product: Product;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(private _productsService: ProductsService) { }

  @ViewChild('table', { static: true }) table: MatTable<Products>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private _products: Products[] = [];
  private _preparedData: DataSource[] = [];
  tableColumns: string[] = ['select', 'group.name', 'product.name', 'product.price'];
  groups: string[] = []
  selection = new SelectionModel<DataSource>(true, []);
  dataSource = new MatTableDataSource(this._preparedData);

  ngOnInit() {
    this._getData();
  }

  addToCart() {
    this._removeSelectedRows();
  }

  private _removeSelectedRows() {
    if (this.selection.selected) {
      this.dataSource.data = this.dataSource.data.filter(item => {
        return !this.selection.selected.some(selectedItem => {
          return selectedItem.group.id === item.group.id && selectedItem.product.id === item.product.id;
        });
      });

      this.table.renderRows();
      this.selection.clear();
    }
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
      this._sortDataSource();
      this._getGroups(this._products);
    });
  }

  private _getDataSource(response: Products[]) {
    this._products = response;
    this._prepareDataForTable(this._products);
  }

  private _prepareDataForTable(products: Products[]): DataSource[] {
    products.forEach(product => {
      product.skus.forEach(skus => {
        this._preparedData.push(<DataSource>{
          group: product.group,
          product: skus,
        })
      });
    });

    return this._preparedData;
  }

  private _getPropertyByPath(obj: Object, pathString: string): string {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  private _sortDataSource() {
    this.dataSource.sortingDataAccessor = (data: DataSource, sortHeaderId: string) => {
      return this._getPropertyByPath(data, sortHeaderId);
    };

    this.dataSource.sort = this.sort;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string): string {
    if (!filterValue) {
      this._resetDateSourceFilter();
      return;
    }

    this.dataSource.filterPredicate = (data: DataSource, filterValue: string) => {
      return data.group.name
        .trim()
        .toLowerCase().indexOf(filterValue.trim().toLowerCase()) >= 0;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}