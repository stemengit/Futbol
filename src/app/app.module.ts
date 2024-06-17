import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EquipoModule } from './equipos/equipo.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    EquipoModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
