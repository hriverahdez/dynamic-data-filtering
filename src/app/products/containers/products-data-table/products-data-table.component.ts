import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { ProductsDataService } from '../../services/products-data.service';
import { Product } from '../../types';

@Component({
  selector: 'app-products-data-table',
  templateUrl: './products-data-table.component.html',
  styleUrls: ['./products-data-table.component.scss'],
})
export class ProductsDataTableComponent implements OnInit {
  productHeaders$: Observable<string[]> =
    this.productsDataService.productHeaders$;
  productHeaders: string[] = [];

  products$: Observable<Product[]> = this.productsDataService.products$;
  products: Product[] = [];

  dataSource: MatTableDataSource<Product>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productsDataService: ProductsDataService) {
    this.dataSource = new MatTableDataSource([] as Product[]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.products$.subscribe((products) => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
    });

    this.productHeaders$.subscribe(
      (headers) => (this.productHeaders = headers)
    );
  }
}
