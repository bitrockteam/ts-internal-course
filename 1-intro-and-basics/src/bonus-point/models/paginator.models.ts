import { CharactersResponse } from "../../exercise/models/rick-and-morty.models";

export interface CharactersPaginatorOptions {
  page: number;
  direction: 1 | -1;
}

export interface PaginatedCharactersResponse {
  response: CharactersResponse;
  page: number;
}
