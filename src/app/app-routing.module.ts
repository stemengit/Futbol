import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'futbol',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule )
  },
  {
    path: '**',
    redirectTo: 'futbol'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
