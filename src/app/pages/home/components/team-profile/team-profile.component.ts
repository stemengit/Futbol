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

  isNameAsc: boolean = true;
  isRatingAsc: boolean = true;
  isCountryAsc: boolean = true;

  roleOrder: string[] = ['POR', 'DEF', 'CEN', 'DEL']
  isRoleAsc: boolean = true;


  orderByName() {
    this.isNameAsc = !this.isNameAsc;
    const sortedData = this.dataPlayerSource.sort((a, b) => {
      const nameA = a.nick.toLowerCase();
      const nameB = b.nick.toLowerCase();
      if (nameA < nameB) {
        return this.isNameAsc ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.isNameAsc ? 1 : -1;
      }
      return 0;
    });
    this.dataPlayerSource = [...sortedData];
  }

  orderByRating() {
    this.isRatingAsc = !this.isRatingAsc;
    const sortedData = this.dataPlayerSource.sort((a, b) => {
      return this.isRatingAsc ? a.rating - b.rating : b.rating - a.rating;
    });
    this.dataPlayerSource = [...sortedData];
  }

  orderByCountry() {
    this.isCountryAsc = !this.isCountryAsc;
    const sortedData = this.dataPlayerSource.sort((a, b) => {
      const countryA = a.CountryCode.toLowerCase();
      const countryB = b.CountryCode.toLowerCase();
      if (countryA < countryB) {
        return this.isCountryAsc ? -1 : 1;
      }
      if (countryA > countryB) {
        return this.isCountryAsc ? 1 : -1;
      }
      return 0;
    });
    this.dataPlayerSource = [...sortedData];
  }

  orderByRole() {
    this.isRoleAsc = !this.isRoleAsc;
    const sortedData = this.dataPlayerSource.sort((a, b) => {
      const roleA = this.getRole(a.role).text;
      const roleB = this.getRole(b.role).text;
      const roleAIndex = this.roleOrder.indexOf(roleA);
      const roleBIndex = this.roleOrder.indexOf(roleB);

      if (roleAIndex < roleBIndex) {
        return this.isRoleAsc ? -1 : 1;
      }
      if (roleAIndex > roleBIndex) {
        return this.isRoleAsc ? 1 : -1;
      }
      return 0;
    });
    this.dataPlayerSource = [...sortedData];
  }

}

