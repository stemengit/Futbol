import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Team } from '../interfaces/equipos.interfaces';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl: string = 'https://football-42h8.onrender.com/';

  public cacheStore: CacheStore = {
    byTeam:   { term: '', teamsPlayers: [] },

  }

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<{ team: Team[] }>(this.baseUrl+'competition/la_liga').pipe(
      map(response => response.team)
    );
  }

  getTeamsByBaseAlias( basealias: string ): Observable<Team> {
    return this.getTeams().pipe(
      map( teams => teams.find(team => team.basealias === basealias)!)
    )
  }


}
