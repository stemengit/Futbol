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
    { text: 'All', class: 'role-all', value: '' },
    { text: 'POR', class: 'role-por', value: 'POR' },
    { text: 'DEF', class: 'role-def', value: 'DEF' },
    { text: 'CEN', class: 'role-cen', value: 'CEN' },
    { text: 'DEL', class: 'role-del', value: 'DEL' }
  ];


  activeRating: string = '';
  activeRole: string = '';
  activeCountry: string = '';
  searchName: string  = '';
  noPlayersFound: boolean = false;

  @ViewChild('selectorForm') myForm: any;

  constructor(private playerService: PlayerService) { }

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

  applyFilters(): void {
    this.dataSource = this.players.filter(player => {
      return (!this.activeRating || player.rating.toString() === this.activeRating) &&
        (!this.activeRole || this.getRole(player.role).text === this.activeRole) &&
        (!this.activeCountry || player.CountryCode.toLowerCase() === this.activeCountry.toLowerCase()) &&
        (player.nick.toLowerCase().includes(this.searchName.toLowerCase()));
    });

    this.noPlayersFound = this.dataSource.length === 0;

    console.log('Filtered Data:', this.dataSource);
  }

  setFilters(filters: { rating: string , role: string , country: string , name: string }) {
    console.log('filtros',filters);
    this.activeRating = filters.rating;
    this.activeRole = filters.role;
    this.activeCountry = filters.country;
    this.searchName = filters.name;
    this.applyFilters();
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
    const sortedData = this.dataSource.sort((a, b) => {
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
    this.dataSource = [...sortedData];
  }

  orderByRating() {
    this.isRatingAsc = !this.isRatingAsc;
    const sortedData = this.dataSource.sort((a, b) => {
      return this.isRatingAsc ? a.rating - b.rating : b.rating - a.rating;
    });
    this.dataSource = [...sortedData];
  }

  orderByCountry() {
    this.isCountryAsc = !this.isCountryAsc;
    const sortedData = this.dataSource.sort((a, b) => {
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
    this.dataSource = [...sortedData];
  }

  orderByRole() {
    this.isRoleAsc = !this.isRoleAsc;
    const sortedData = this.dataSource.sort((a, b) => {
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
    this.dataSource = [...sortedData];
  }



}
