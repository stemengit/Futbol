import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../../../interfaces/jugadores.interface';
import { PlayerService } from '../../../../services/jugador.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})
export class TeamProfileComponent implements OnInit {

  public players: Player[] = [];
  displayedColumns: string[] = ['name', 'CountryCode', 'roleAndNumber', 'rating'];
  dataSource: Player[] = [];
  ratings: number[] = [];
  countries: string[] = [];
  roles = [
    // { text: 'All', class: 'role-all', value: 0 },
    { text: 'POR', class: 'role-por', value: 1},
    { text: 'DEF', class: 'role-def', value: 2},
    { text: 'CEN', class: 'role-cen', value: 3},
    { text: 'DEL', class: 'role-del', value: 4}
  ];


  public activeRating: string = '';
  public activeRole: string = '';
  public activeCountry: string = '';
  public activePlayer: string = '';

  @ViewChild('selectorForm') myForm: any;


  constructor(
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ basealias }) => this.playerService.getPlayersByTeam(basealias))
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

  applyFilters(): void {
    this.dataSource = this.players.filter(player => {
      return (!this.activeRating || player.rating.toString() === this.activeRating) &&
             (!this.activeRole || this.getRole(player.role).text === this.activeRole) &&
             (!this.activeCountry || player.CountryCode.toLowerCase() === this.activeCountry.toLowerCase()) &&
             (!this.activePlayer || player.nick.toLowerCase() === this.activePlayer.toLowerCase());
    });

    // || this.activeRole === '0'

    console.log('Filtered Data:', this.dataSource);
  }

  OnSearchChangeRating(searchRating: string): void {
    console.log('Search Rating:', searchRating);
    this.activeRating = searchRating;
    this.applyFilters();
  }

  OnSearchChangeRole(searchRole: string): void {
    console.log('Search Role:', searchRole);
    this.activeRole = searchRole;
    this.applyFilters();
  }

  OnSearchChangeCountry(searchCountry: string): void {
    console.log('Search Country:', searchCountry);
    this.activeCountry = searchCountry;
    this.applyFilters();
  }

  OnSearchChangePlayer(searchValue: string): void {
    this.dataSource = this.players.filter(player =>
      player.nick.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log('Filtered Data by Player Name:', this.dataSource);
    // this.applyFilters();
  }

  getRole(role: number): { text: string, class: string } {
    const roleMap: { [key: number]: { text: string, class: string } } = {
      // 0: { text: 'ALL', class: 'role-default' },
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

