import { Component } from '@angular/core';
import { Team } from '../../interfaces/equipos.interfaces';
import { TeamService } from '../../services/equipo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public teams: Team[] = [];
  public teamsPlayers: Team[] = [];
  public initialValue: string = '';

  constructor( private teamService: TeamService ) {}

  ngOnInit(): void {
    this.teamsPlayers  = this.teamService.cacheStore.byTeam.teamsPlayers;
    this.initialValue  = this.teamService.cacheStore.byTeam.term;

  }

  searchByTeam( term: string ):void  {

    this.teamService.searchTeam( term )
      .subscribe( teamsPlayers => {
        this.teamsPlayers = teamsPlayers;
      });

  }

}
