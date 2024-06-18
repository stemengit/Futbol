import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/jugador.service';
import { Player } from '../../interfaces/jugadores.interface';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  public players: Player[] = [];
  displayedColumns: string[] = [ 'name', 'CountryCode', 'roleAndNumber', 'rating'];
  dataSource: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(data => {
      console.log('Data received:', data);
      this.players = data;
      this.dataSource = this.players;
      console.log('Players:', this.players);
    });
  }

  getRole(role: number): string {
    console.log('Role value:', role);
    const roleMap: { [key: number]: string } = {
      1: 'POR',
      2: 'DEF',
      3: 'CEN',
      4: 'DEL'
    };

    return roleMap[role] || 'Role';
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
