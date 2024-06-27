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

  isLoading: boolean = false;
  noTeamFound: boolean = false;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(data => {
      this.teams = data;
      this.dataSource = this.teams;
      console.log(this.teams)
      this.isLoading = true;
    });
  }

  OnSearchChangeTeam(searchValue: string):void {
    this.dataSource = this.teams.filter(team =>
      team.nameShow.toLowerCase().includes(searchValue.toLowerCase())
    )
    this.noTeamFound = this.dataSource.length === 0;
  }

  isNameAsc: boolean = true;

  orderByName() {
    this.isNameAsc = !this.isNameAsc;
    const sortedData = this.dataSource.sort((a, b) => {
      const nameA = a.nameShow.toLowerCase();
      const nameB = b.nameShow.toLowerCase();
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

}
