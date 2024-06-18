import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoPageComponent } from './pages/equipo-page/equipo-page.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  {
    path: '',
    component: EquipoPageComponent,
    children: [
      {
      path: 'equipo',
      component: TeamTableComponent,
      children: [
        { path: 'equipo/:id', component: TeamComponent },
      ]
      },
      { path: 'jugadores', component: PlayerTableComponent },

      { path: '', redirectTo: 'equipo', pathMatch: 'full' },
      { path: '**', redirectTo: 'equipo' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipoRoutingModule { }
