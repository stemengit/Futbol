import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'equipos',
    loadChildren: () => import('./equipos/equipo.module').then( m => m.EquipoModule )
  },
  {
    path: '**',
    redirectTo: 'equipos'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
