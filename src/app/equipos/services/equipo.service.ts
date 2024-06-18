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

  private getTeamRequest( url: string ): Observable<Team[]> {
    return this.http.get<Team[]>( url )
      .pipe(
        catchError( () => of([]) ),
        // delay( 2000 ),
      );
  }

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get< {team: Team[] }>(this.baseUrl).pipe(
      map(response => response.team)
    )
  }

  searchTeam( term: string ): Observable<Team[]> {

    const url = `${ this.baseUrl }/capital/${ term }`;
    return this.getTeamRequest(url)
        .pipe(
          tap( teamsPlayers => this.cacheStore.byTeam = { term, teamsPlayers }),
        );
  }

}
