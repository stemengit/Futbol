import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ComponentsModule } from './components/component.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    ComponentsModule,
  ],
})
export class HomeModule { }
