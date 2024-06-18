export interface TopLevel {
  players: Player[];
}

export interface Player {
  id:          string;
  nick:        string;
  CountryCode: string;
  role:        string;
  height:      string;
  weight:      string;
  birthdate:   Date;
  squadNumber: string;
  rating:      string;
  image?:       null;
}
