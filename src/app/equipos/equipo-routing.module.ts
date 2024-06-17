import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoPageComponent } from './pages/equipo-page/equipo-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'equipos', component: EquipoPageComponent },
      { path: '**', redirectTo: 'equipos' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipoRoutingModule { }
