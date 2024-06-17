// src/app/services/team.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Team } from '../interfaces/equipos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl: string = 'http://localhost:3000/spain/teams';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get< {team: Team[] }>(this.baseUrl).pipe(
      map(response => response.team)
    )
  }
}
