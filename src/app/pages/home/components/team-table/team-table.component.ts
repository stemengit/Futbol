import { Component, OnInit } from '@angular/core';
import { Team } from '../../../../interfaces/equipos.interfaces';
import { TeamService } from '../../../../services/equipo.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrl: './team-table.component.css'
})
export class TeamTableComponent implements OnInit {

  public teams: Team[] = [];
  displayedColumns: string[] = ['shield', 'nameShow', 'flag', 'short_name'];
  dataSource: Team[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(data => {
      this.teams = data;
      this.dataSource = this.teams;
      console.log(this.teams)
    });
  }
}
