import { CharactersResponse } from '../../exercise/models/rick-and-morty.models';

export interface CharactersPaginatorOptions {
  page: number;
  direction: Direction;
}

export interface PaginatedCharactersResponse {
  response: CharactersResponse;
  page: number;
}

export type Direction = 1 | -1;
