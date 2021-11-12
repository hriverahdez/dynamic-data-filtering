import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { FiltersService } from '../../services/filters.service';
import { ProductsDataService } from '../../services/products-data.service';
import { DynamicFilter, Product } from '../../types';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  productHeaders$: Observable<string[]> =
    this.productsDataService.productHeaders$;
  productHeaders: string[] = [];

  products$: Observable<Product[]> = this.productsDataService.products$;
  products: Product[] = [];

  activeFilters$: Observable<DynamicFilter<Product>[]> =
    this.filtersService.activeFilters$;

  filteredProducts$: Observable<Product[]> = combineLatest([
    this.products$,
    this.activeFilters$,
  ]).pipe(
    map(([products, filters]) => {
      return filters.reduce((acc, filter) => {
        return this.filtersService.applyFilter(acc, filter);
      }, products);
    })
  );

  constructor(
    private productsDataService: ProductsDataService,
    private filtersService: FiltersService
  ) {}

  ngOnInit(): void {
    this.filteredProducts$.subscribe((products) => {
      this.products = products;
    });

    this.productHeaders$.subscribe(
      (headers) => (this.productHeaders = headers)
    );
  }
}
