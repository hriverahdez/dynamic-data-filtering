import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import * as fromContainers from './containers';

@NgModule({
  declarations: [...fromContainers.containers],
  imports: [CommonModule, HttpClientModule],
  exports: [fromContainers.DataTableComponent],
})
export class DataModule {}
