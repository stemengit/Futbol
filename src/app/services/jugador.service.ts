import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/jugadores.interface';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  // private baseUrl: string = 'http://localhost:3000/spain/teams/players';
  private baseUrl: string = 'https://football-42h8.onrender.com';


  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<{ players: Player[] }>(`${this.baseUrl}/players/la_liga`).pipe(
      map(response => response.players)
    );
  }

  getPlayersByTeam( basealias: string ): Observable<Player[]> {
    console.log('Perfil Equipo',`${ this.baseUrl }/${ basealias }`)
    return this.http.get<{ players: Player[] }>(`${this.baseUrl}/team/spain/${basealias}`).pipe(
      map(response => response.players)
    );
  }


}
