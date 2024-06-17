import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from '../material/material.module';
import { EquipoPageComponent } from './pages/equipo-page/equipo-page.component';


@NgModule({
  declarations: [
    EquipoPageComponent
  ],
  imports: [
    CommonModule,
    EquipoRoutingModule,
    MatSlideToggleModule,
    MaterialModule,
  ]
})
export class EquipoModule { }
