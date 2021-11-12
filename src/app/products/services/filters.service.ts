import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFilter, DynamicFilterOperator, Product } from '../types';

type FilterFn = (data: Product[], filter: DynamicFilter<Product>) => Product[];

const applyContains: FilterFn = (data, filter) => {
  const { dataProperty, value } = filter;

  return data.filter((product) => {
    if (
      typeof product[dataProperty] === 'string' &&
      typeof value === 'string'
    ) {
      const stringValue = product[dataProperty] as string;
      return stringValue.includes(value);
    }

    return true;
  });
};

const applyEquals: FilterFn = (data, filter) => {
  const { dataProperty, value } = filter;

  return data.filter((product) => {
    const isStringValue = typeof product[dataProperty] === 'string';
    const isNumberValue = typeof product[dataProperty] === 'number';
    const isStringFilterValue = typeof value === 'string';
    const isNumberFilterValue = typeof value === 'number';
    if (
      (isStringValue && isStringFilterValue) ||
      (isNumberValue && isNumberFilterValue)
    ) {
      return product[dataProperty] === value;
    }

    return true;
  });
};

const applyGreaterEqual: FilterFn = (data, filter) => {
  const { dataProperty, value } = filter;

  return data.filter((product) => {
    if (
      typeof product[dataProperty] === 'number' &&
      typeof value === 'number'
    ) {
      const numberValue = product[dataProperty] as number;
      return value >= numberValue;
    }

    return true;
  });
};

const applyLessEqual: FilterFn = (data, filter) => {
  const { dataProperty, value } = filter;

  return data.filter((product) => {
    if (
      typeof product[dataProperty] === 'number' &&
      typeof value === 'number'
    ) {
      const numberValue = product[dataProperty] as number;
      return value <= numberValue;
    }

    return true;
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
