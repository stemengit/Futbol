import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { MaterialModule } from '../material/material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { EquipoPageComponent } from './pages/equipo-page/equipo-page.component';
import { TeamComponent } from './components/team/team.component';



@NgModule({
  declarations: [
    SidebarComponent,
    TeamTableComponent,
    EquipoPageComponent,
    ToolbarComponent,
    PlayerTableComponent,
    TeamComponent,

  ],
  imports: [
    CommonModule,

    EquipoRoutingModule,
    MaterialModule,
    MatSlideToggleModule,
  ],

})
export class EquipoModule { }
