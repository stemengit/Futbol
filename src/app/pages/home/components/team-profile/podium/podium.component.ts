import { Component } from '@angular/core';
import { Player } from '../../../../../interfaces/jugadores.interface';
import { PlayerService } from '../../../../../services/jugador.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TeamService } from '../../../../../services/equipo.service';
import { Team } from '../../../../../interfaces/equipos.interfaces';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css'
})
export class PodiumComponent {

  public players: Player[] = [];
  public teams: Team[] = [];
  public topPlayers: Player[] = [];
  displayedColumns: string[] = ['name', 'CountryCode', 'roleAndNumber', 'rating'];
  dataSource: Player[] = [];

  constructor(
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ basealias }) => this.playerService.getPlayersByTeam(basealias))
      )
      .subscribe(data => {
        this.players = data;
        this.dataSource = this.players;
        this.topPlayers = this.getTopPlayers(this.players);
        console.log('Jugadores de 1 solo equipo:', this.players);
        console.log('Top 3 jugadores:', this.topPlayers);
      });


  }

  getTopPlayers(players: Player[]): Player[] {
    return players
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 3);
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
