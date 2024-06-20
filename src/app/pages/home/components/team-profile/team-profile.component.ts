import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../../../interfaces/jugadores.interface';
import { PlayerService } from '../../../../services/jugador.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})
export class TeamComponent implements OnInit {

  public players: Player[] = [];
  displayedColumns: string[] = [ 'name', 'CountryCode', 'roleAndNumber', 'rating'];
  dataSource: Player[] = [];
  ratings: number[] = [];
  countries: string[] = [];
  roles = [
    { text: 'POR', class: 'role-por' },
    { text: 'DEF', class: 'role-def' },
    { text: 'CEN', class: 'role-cen' },
    { text: 'DEL', class: 'role-del' }
  ];

  constructor(
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
    switchMap( ({ basealias }) => this.playerService.getPlayersByTeam(basealias))
    ).subscribe(data => {
      this.players = data;
      this.dataSource = this.players;
      console.log('Jugadores de 1 solo equipo:', this.players);
      this.extractFilters(data);
    });
  }

  extractFilters(players: Player[]): void {
    this.ratings = [...new Set(this.players.map(player => player.rating))];
    this.countries = [...new Set(players.map(player => player.CountryCode))];
  }

  OnSearchChangePlayer(searchValue: string):void {
    this.dataSource = this.players.filter(player =>
      player.nick.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  OnSearchChangeRating(searchRating: number): void {
    this.dataSource = this.players.filter(player =>
      player.rating === searchRating
    );
  }

  OnSearchChangeRole(searchRole: string): void {
    const roleMap: { [key: string]: number } = {
        'POR': 1,
        'DEF': 2,
        'CEN': 3,
        'DEL': 4
    };
    const roleNumber = roleMap[searchRole];
    this.dataSource = this.players.filter(player =>
      player.role === roleNumber
    );
  }

  OnSearchChangeCountry(searchCountry: string): void {
    this.dataSource = this.players.filter(player =>
      player.CountryCode.toLowerCase().includes(searchCountry.toLowerCase())
    );
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

