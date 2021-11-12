import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { FiltersService } from '../../services/filters.service';
import { ProductsDataService } from '../../services/products-data.service';
import { DynamicFilter, Product } from '../../types';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  activeFilters$: Observable<DynamicFilter[]>;

  headers: Array<string> = [];

  unsubscribeAll$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsDataService,
    private filtersService: FiltersService,
    private dialogService: DialogService
  ) {
    this.activeFilters$ = this.filtersService.activeFilters$;
  }

  ngOnInit(): void {
    this.productsService.productHeaders$
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((headers) => (this.headers = headers));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
  }

  openFilterFormDialog(filter: DynamicFilter<Product> | null = null) {
    const dialogRef = this.dialogService.openDialog<FilterDialogComponent>(
      FilterDialogComponent,
      {
        data: {
          filter,
          availableProperties: this.headers,
        },
        width: '60%',
      }
    );

    const componentInstance = dialogRef.componentInstance;

    componentInstance.create
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((filter) => {
        this.filtersService.addFilter(filter);
        dialogRef.close();
      });

    componentInstance.update
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((filter) => {
        this.filtersService.updateFilter(filter);
        dialogRef.close();
      });
  }
}
