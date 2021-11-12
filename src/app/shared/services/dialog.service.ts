import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  defaultDialogConfig = {
    width: '50%',
  };

  openDialog<T>(
    component: ComponentType<T>,
    config: MatDialogConfig = this.defaultDialogConfig
  ) {
    const dialogRef = this.dialog.open(component, config);
    return dialogRef;
  }
}
