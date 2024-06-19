import { Team } from "./equipos.interfaces";


export interface CacheStore{
  byTeam: TeamPlayers
}

export interface TeamPlayers {
  term:string;
  teamsPlayers: Team[];
}


