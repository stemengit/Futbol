import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../../services/jugador.service';
import { Player } from '../../../../interfaces/jugadores.interface';


@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  public players: Player[] = [];
  displayedColumns: string[] = [ 'name', 'CountryCode', 'roleAndNumber', 'rating'];
  dataSource: Player[] = [];

  constructor(
    private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(data => {
      console.log('Todos los jugadores:', data);
      this.players = data;
      this.dataSource = this.players;
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

  // FILTRO

}
