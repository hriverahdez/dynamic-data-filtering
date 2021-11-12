import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Product } from '../../types';

@Component({
  selector: 'app-products-data-table',
  templateUrl: './products-data-table.component.html',
  styleUrls: ['./products-data-table.component.scss'],
})
export class ProductsDataTableComponent implements OnChanges {
  dataSource: MatTableDataSource<Product>;

  @Input() products: Product[] = [];
  @Input() productHeaders: string[] = [];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource([] as Product[]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']) {
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
    }
  }
}
