import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const exportingModules = [
  CommonModule,
  MatTableModule,
  MatCheckboxModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
];

const directives = [

];

@NgModule({
  imports: [
    ...exportingModules,
  ],
  exports: [
    ...exportingModules,
    ...directives,
  ],
  declarations: [
    ...directives,
  ],
})
export class SharedModule {
}
