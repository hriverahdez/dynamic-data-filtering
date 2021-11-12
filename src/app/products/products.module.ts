import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import * as fromContainers from './containers';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...fromContainers.containers],
  imports: [CommonModule, HttpClientModule, SharedModule],
  exports: [fromContainers.ProductsDataTableComponent],
})
export class ProductsModule {}
