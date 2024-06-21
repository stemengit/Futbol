import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../../../services/jugador.service';
import { Player } from '../../../../interfaces/jugadores.interface';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  public players: Player[] = [];
  displayedColumns: string[] = ['name', 'CountryCode', 'roleAndNumber', 'rating'];
  dataSource: Player[] = [];

  ratings: number[] = [];
  countries: string[] = [];
  roles = [
    { text: 'POR', class: 'role-por' },
    { text: 'DEF', class: 'role-def' },
    { text: 'CEN', class: 'role-cen' },
    { text: 'DEL', class: 'role-del' }
  ];
  @ViewChild('selectorForm') myForm: any;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(data => {
      console.log('Todos los jugadores:', data);
      this.players = data;
      this.dataSource = this.players;
      this.extractFilters(data);
    });
  }

  extractFilters(players: Player[]): void {
    this.ratings = [...new Set(this.players.map(player => player.rating))];
    this.countries = [...new Set(players.map(player => player.CountryCode))];

    console.log('Extracted Ratings:', this.ratings);
    console.log('Extracted Countries:', this.countries);
  }

  OnSearchChangeRating(searchRating: number): void {
    console.log('Search Rating:', searchRating);

    this.dataSource = this.players.filter(player =>
      player.rating.toString() === searchRating.toString()
    );

    console.log('Filtered Data:', this.dataSource);
}



OnSearchChangeRole(searchRole: string): void {
  console.log('Search Role:', searchRole);

  const roleMap: { [key: string]: number } = {
      'POR': 1,
      'DEF': 2,
      'CEN': 3,
      'DEL': 4
  };

  const roleNumber = roleMap[searchRole];
  if (roleNumber !== undefined) {
      this.dataSource = this.players.filter(player =>
          player.role.toString() === roleNumber.toString()
      );
  } else {
      this.dataSource = this.players;
  }
  console.log('Filtered Data:', this.dataSource);
}




  OnSearchChangeCountry(searchCountry: string): void {
    this.dataSource = this.players.filter(player =>
      player.CountryCode.toLowerCase().includes(searchCountry.toLowerCase())
    );
  }

  OnSearchChangePlayer(searchValue: string): void {
    this.dataSource = this.players.filter(player =>
      player.nick.toLowerCase().includes(searchValue.toLowerCase())
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
