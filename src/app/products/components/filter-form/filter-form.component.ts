import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { nanoid } from 'nanoid';

import { DynamicFilter, DynamicFilterOperator, Product } from '../../types';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  isEdit: boolean = false;
  filterForm: FormGroup = this.toFormGroup();

  availableOperators: Array<DynamicFilterOperator> = [
    'contains',
    'equals',
    'greaterEqual',
    'lessEquals',
  ];

  // @ts-ignore
  @Input() filter: DynamicFilter<Product>;
  @Input() availableProperties: Array<string> = [];
  @Output() create = new EventEmitter<DynamicFilter<Product>>();
  @Output() update = new EventEmitter<DynamicFilter<Product>>();
  @Output() cancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (this.filter) {
      this.isEdit = true;
      this.filterForm.patchValue(this.filter);
    }
  }

  saveForm(filterForm: FormGroup) {
    const { value } = filterForm;

    if (!this.isEdit) {
      this.create.emit({ id: nanoid(), ...value });
    } else {
      this.update.emit({
        id: this.filter.id,
        ...value,
      });
    }
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      dataProperty: [''],
      operator: [''],
      value: [''],
    });
  }
}
