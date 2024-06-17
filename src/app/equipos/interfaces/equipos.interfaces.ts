export interface TopLevel {
  team: Team[];
}

export interface Team {
  id:           string;
  id_comp:      string;
  nameShow:     string;
  translate:    string;
  group_code:   string;
  favorite:     string;
  basealias:    string;
  fullName:     string;
  conference:   string;
  short_name:   string;
  year:         string;
  color1:       string;
  countryCode:  CountryCode;
  nameShowTeam: string;
  alerts:       string;
  shield?:      string;
  shield_big?:  string;
  shield_png?:  string;
  flag?:        string;
  gender:       number;
}

export enum CountryCode {
  Es = "ES",
}
