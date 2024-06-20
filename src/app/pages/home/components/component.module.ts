import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../material/material.module';
import { HomeRoutingModule } from '../home-routing.module';

import { PlayerImagePipe } from '../../../pipes/player-image.pipe';
import { ShieldImagePipe } from '../../../pipes/shield-image.pipe';

import { HomePageComponent } from '../home-page.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { PodiumComponent } from './team-profile/podium/podium.component';
import { TeamComponent } from './team-profile/team-profile.component';
import { TeamTableComponent } from './team-table/team-table.component';


import { SidebarComponent } from './player-sidebar/player-sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TeamSidebarComponent } from './team-sidebar/team-sidebar.component';



@NgModule({
  declarations: [
    HomePageComponent,

    PlayerTableComponent,
    TeamComponent,
    TeamTableComponent,
    PodiumComponent,

    SidebarComponent,
    ToolbarComponent,

    PlayerImagePipe,
    ShieldImagePipe,
    TeamSidebarComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
  ]
})
export class ComponentsModule { }
