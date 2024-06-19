import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Team } from '../interfaces/equipos.interfaces';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl: string = 'http://localhost:3000/spain/teams';

  public cacheStore: CacheStore = {
    byTeam:   { term: '', teamsPlayers: [] },

  }

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get< {team: Team[] }>(this.baseUrl).pipe(
      map(response => response.team)
    )
  }

  getTeamByAlias(basealias: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${basealias}`);
  }


}
