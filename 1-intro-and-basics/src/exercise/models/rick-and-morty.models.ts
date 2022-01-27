export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface UrlInfo {
  name: string;
  url: string;
}

export interface CharactersResponse {
  info?: Info;
  results: Array<Character>;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: UrlInfo;
  location:UrlInfo;
  image: string;
  episode: Array<string>;
  url: string;
  created: string; // ISO Date
}

export interface CharacterSummary {
  name: string;
  species: string;
  episodesCount: number;
}

/*
export interface ServerResponse<T> {
  info: Info;
  results: Array<T>;
}

export type CharacterSummary = Pick<Character,'name'|'species'> & {
  episodeCount: number;
}*/
