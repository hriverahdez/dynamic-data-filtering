import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, take } from 'rxjs';
import { Product } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  visibleHeaders = [
    'product_name',
    'product_desc',
    'price',
    'currency',
    'category',
  ];

  products$: Observable<Product[]> = this.fetchData().pipe(
    shareReplay(1),
    map((productsDictionary) => Object.values(productsDictionary))
  );

  productHeaders$: Observable<string[]> = this.products$.pipe(
    take(1),
    map((product) => {
      return Object.keys(product[0]).filter((key) =>
        this.visibleHeaders.includes(key)
      );
    })
  );

  constructor(private httpClient: HttpClient) {}

  private fetchData() {
    return this.httpClient.get<Record<string, Product>>(
      'assets/table_data.json'
    );
  }
}
