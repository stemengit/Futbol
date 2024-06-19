import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page.component';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../../material/material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlayerImagePipe } from '../../pipes/player-image.pipe';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { ShieldImagePipe } from '../../pipes/shield-image.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TeamComponent } from './components/team-profile/team-profile.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PodiumComponent } from './components/team-profile/podium/podium.component';



@NgModule({
  declarations: [
    HomePageComponent,

    PlayerTableComponent,
    TeamComponent,
    TeamTableComponent,

    SidebarComponent,
    ToolbarComponent,

    PlayerImagePipe,
    ShieldImagePipe,
    PodiumComponent

  ],
  imports: [
    CommonModule,

    HomeRoutingModule,
    MaterialModule,
    MatSlideToggleModule,
  ],

})
export class HomeModule { }
