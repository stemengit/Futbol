export interface TopLevel {
  players: Player[];
}

export interface Player {
  id:          string;
  nick:        string;
  CountryCode: string;
  role:        number;
  height:      string;
  weight:      string;
  birthdate:   Date;
  squadNumber: string;
  rating:      number;
  image?:      string | null;
  [key: string]: any;
}
