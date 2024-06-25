import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../../../interfaces/jugadores.interface';
import { PlayerService } from '../../../../services/jugador.service';
import { switchMap } from 'rxjs';
import { TeamService } from '../../../../services/equipo.service';
import { Team } from '../../../../interfaces/equipos.interfaces';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})
export class TeamProfileComponent implements OnInit {

  public players: Player[] = [];
  public teams: Team[] = [];
  displayedColumns: string[] = ['name', 'CountryCode', 'roleAndNumber', 'rating'];
  dataPlayerSource: Player[] = [];
  dataTeamSource: Team[] = []
  ratings: number[] = [];
  countries: string[] = [];
  roles = [
    { text: 'All', class: 'role-all', value: '' },
    { text: 'POR', class: 'role-por', value: 'POR'},
    { text: 'DEF', class: 'role-def', value: 'DEF'},
    { text: 'CEN', class: 'role-cen', value: 'CEN'},
    { text: 'DEL', class: 'role-del', value: 'DEL'}
  ];

  @ViewChild('selectorForm') myForm: any;


  constructor(
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ basealias }) => this.playerService.getPlayersByTeam(basealias))
      ).subscribe(data => {
        this.players = data;
        this.dataPlayerSource = this.players;
        console.log('Jugadores de 1 solo equipo:', this.players);
      });

      this.activatedRoute.params
      .pipe(
      switchMap(({ basealias }) => this.teamService.getTeamsByBaseAlias(basealias)))
      .subscribe(data => {
              this.teams = [data];
              this.dataTeamSource = this.teams;
              console.log('Equipo por URL',this.teams)
            });
  }

  getRole(role: number): { text: string, class: string } {
    const roleMap: { [key: number]: { text: string, class: string } } = {
      1: { text: 'POR', class: 'role-por' },
      2: { text: 'DEF', class: 'role-def' },
      3: { text: 'CEN', class: 'role-cen' },
      4: { text: 'DEL', class: 'role-del' }
    };

    return roleMap[role] || { text: 'Role', class: 'role-default' };
  }

  getRatingColor(rating: number): string {
    if (rating >= 90) {
      return 'rating-excellent';
    } else if (rating >= 81) {
      return 'rating-great';
    } else if (rating >= 71) {
      return 'rating-good';
    } else if (rating >= 61) {
      return 'rating-average';
    } else {
      return 'rating-poor';
    }
  }
}

