import fetch, { Response } from 'node-fetch';
import { Character, CharactersResponse } from './models/rick-and-morty.models';

interface IRickAndMortyCharactersApi {
  fetchCharacters: (page: string) => Promise<CharactersResponse>;
  printCharacters: () => void;
}

class RickAndMortyApi {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private url: string) {
  }

  protected async fetchApi(page?: string): Promise<any> {
    try {
      const queryParams = page ? `?page=${ page }` : '';
      const response: Response = await fetch(
        `${ this.baseUrl }/${ this.url }${ queryParams }`
      );
      if(!response.ok) {
        console.error(`Error on response: "${ response.statusText }"`);
        return { results: [] };
      }
      return await response.json();
    } catch(error) {
      console.error(`Error on response: "${ error }"`);
    }
  }
}

class RickAndMortyCharactersApi extends RickAndMortyApi implements IRickAndMortyCharactersApi {
  private characters: Character[];

  constructor() {
    super('character');
  }

  async fetchCharacters(page?: string) {
    const response = (await this.fetchApi(page)) as CharactersResponse;

    this.characters = response.results;
    return response;
  }

  printCharacters = () => {
    const formattedPrint = this.characters.map((char) => char.name).join('\n');
    console.log(formattedPrint);
  };
}

const rickAndMorty = new RickAndMortyCharactersApi();
await rickAndMorty.fetchCharacters();
rickAndMorty.printCharacters();
