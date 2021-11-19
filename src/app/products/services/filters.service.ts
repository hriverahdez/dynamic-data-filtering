import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFilter, DynamicFilterOperator, Product } from '../types';

type FilterFn = (data: Product[], filter: DynamicFilter<Product>) => Product[];

const isNumber = (value: unknown): boolean => {
  return typeof value === 'number';
};

const isString = (value: unknown): boolean => {
  return typeof value === 'string';
};

const applyContains: FilterFn = (data, filter) => {
  const { dataProperty, value } = filter;

  return data.filter((product) => {
    if (isString(product[dataProperty]) && isString(value)) {
      const stringValue = product[dataProperty].toString();
      return stringValue.includes(value.toString());
    }

    return true;
  });
};

const applyEquals: FilterFn = (data, filter) => {
  const { dataProperty, value } = filter;

  return data.filter((product) => {
    if (isString(product[dataProperty])) {
      return product[dataProperty] === value.toString();
    }

    if (isNumber(product[dataProperty])) {
      return product[dataProperty] === parseFloat(value.toString());
    }

    return true;
  });
};

const applyGreaterEqual: FilterFn = (data, filter) => {
  const { dataProperty, value } = filter;

  return data.filter((product) => {
    const numberFilterValue = parseFloat(value.toString());
    const numberValue = parseFloat(product[dataProperty].toString());

    return numberValue >= numberFilterValue;
  });
};

const applyLessEqual: FilterFn = (data, filter) => {
  const { dataProperty, value } = filter;

  return data.filter((product) => {
    const numberFilterValue = parseFloat(value.toString());
    const numberValue = parseFloat(product[dataProperty].toString());

    return numberValue <= numberFilterValue;
  });
};

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private activeFiltersSubject = new BehaviorSubject<DynamicFilter<Product>[]>([
    {
      id: '7687h',
      dataProperty: 'product_name',
      operator: 'contains',
      value: 'Avobenzone',
    },
  ]);

  activeFilters$: Observable<DynamicFilter<Product>[]> =
    this.activeFiltersSubject.asObservable();

  constructor() {}

  addFilter(filterToAdd: DynamicFilter<Product>) {
    const currentFilters = this.activeFiltersSubject.getValue();

    const nextValue = [...currentFilters, filterToAdd];

    this.activeFiltersSubject.next(nextValue);
  }

  updateFilter(filterToUpdate: DynamicFilter<Product>) {
    const currentFilters = this.activeFiltersSubject.getValue();

    const nextValue = currentFilters.map((filter) =>
      filter.id === filterToUpdate.id ? filterToUpdate : filter
    );

    this.activeFiltersSubject.next(nextValue);
  }

  removeFilter(filterToRemove: DynamicFilter<Product>) {
    const currentFilters = this.activeFiltersSubject.getValue();

    const nextValue = currentFilters.filter(
      (filter) => filter.id !== filterToRemove.id
    );

    this.activeFiltersSubject.next(nextValue);
  }

  applyFilter(data: Product[], filter: DynamicFilter<Product>): Product[] {
    const identityFn: FilterFn = (data) => data;

    const filterMapper: Partial<Record<DynamicFilterOperator, FilterFn>> = {
      contains: applyContains,
      equals: applyEquals,
      greaterEqual: applyGreaterEqual,
      lessEquals: applyLessEqual,
    };

    return (filterMapper[filter.operator] || identityFn)(data, filter);
  }
}
