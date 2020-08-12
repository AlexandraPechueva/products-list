import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

const exportingModules = [
  CommonModule,
  MatTableModule,
  MatCheckboxModule,
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
