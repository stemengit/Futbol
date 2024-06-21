import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { TeamProfileComponent } from './components/team-profile/team-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: 'equipos',component: TeamTableComponent },
      { path: 'equipos/equipo/:basealias', component: TeamProfileComponent },
      { path: 'jugadores', component: PlayerTableComponent },
      { path: '', redirectTo: 'equipos', pathMatch: 'full' },
      { path: '**', redirectTo: 'equipos' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
