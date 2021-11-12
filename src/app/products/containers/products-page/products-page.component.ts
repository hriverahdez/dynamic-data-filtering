import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';

import { FiltersService } from '../../services/filters.service';
import { ProductsDataService } from '../../services/products-data.service';
import { DynamicFilter, Product } from '../../types';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
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

  unsubscribeAll$: Subject<any> = new Subject();

  constructor(
    private productsDataService: ProductsDataService,
    private filtersService: FiltersService
  ) {}

  ngOnInit(): void {
    this.filteredProducts$
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((products) => {
        this.products = products;
      });

    this.productHeaders$
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((headers) => (this.productHeaders = headers));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
  }
}
