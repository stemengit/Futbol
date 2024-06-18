import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/jugadores.interface';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private baseUrl: string = 'http://localhost:3000/spain/players';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<{ players: Player[] }>(this.baseUrl).pipe(
      tap(response => console.log('Response from server:', response)),
      map(response => response.players)
    );
  }

}
