import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components, FilterFormComponent, FilterDialogComponent],
  imports: [CommonModule, HttpClientModule, SharedModule],
  exports: [fromContainers.ProductsPageComponent],
})
export class ProductsModule {}
