import { Component, OnInit } from '@angular/core';
import { Team } from '../../interfaces/equipos.interfaces';
import { TeamService } from '../../services/equipo.service';

@Component({
  selector: 'app-equipo-page',
  templateUrl: './equipo-page.component.html',
  styleUrl: './equipo-page.component.css'
})
export class EquipoPageComponent implements OnInit{

  public teams: Team[] = [];

  constructor( private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe( data => {
      console.log(data)
      this.teams = data;
    })
  }

}
