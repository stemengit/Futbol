import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../material/material.module';
import { HomeRoutingModule } from '../home-routing.module';

import { PlayerImagePipe } from '../../../pipes/player-image.pipe';
import { ShieldImagePipe } from '../../../pipes/shield-image.pipe';

import { HomePageComponent } from '../home-page.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { PodiumComponent } from './team-profile/podium/podium.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { TeamTableComponent } from './team-table/team-table.component';


import { SidebarComponent } from './player-table/player-sidebar/player-sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TeamSidebarComponent } from './team-table/team-sidebar/team-sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BigShieldImagePipe } from '../../../pipes/big-shield-image.pipe';


@NgModule({
  declarations: [
    HomePageComponent,

    PlayerTableComponent,
    TeamProfileComponent,
    TeamTableComponent,
    PodiumComponent,
    TeamSidebarComponent,

    SidebarComponent,
    ToolbarComponent,

    BigShieldImagePipe,
    PlayerImagePipe,
    ShieldImagePipe,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ComponentsModule { }
