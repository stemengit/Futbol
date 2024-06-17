import { NgModule } from '@angular/core';


import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  exports: [
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatIconModule
  ]
})
export class MaterialModule { }
