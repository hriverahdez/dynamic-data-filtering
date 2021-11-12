import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFilter, Product } from '../../types';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  @Output() create = new EventEmitter<DynamicFilter<Product>>();
  @Output() update = new EventEmitter<DynamicFilter<Product>>();

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      filter: DynamicFilter<Product>;
      availableProperties: Array<string>;
    }
  ) {}

  ngOnInit(): void {}

  onCreateFilter(filter: DynamicFilter<Product>) {
    this.create.emit(filter);
  }

  onUpdateFilter(filter: DynamicFilter<Product>) {
    this.update.emit(filter);
  }
}
