import fetch, { Response } from 'node-fetch';
import { CharactersResponse } from '../models/rick-and-morty.models';

export const getCharacters = async (page?: number): Promise<CharactersResponse> => {
  try {
    const queryParams = page ? `?page=${page}` : '';
    const response: Response = await fetch(`https://rickandmortyapi.com/api/character${queryParams}`);
    if(!response.ok) {
      console.error(`Error on response: "${ response.statusText }"`);
      return { results: [] };
    }
    return await response.json() as CharactersResponse;
  } catch(error) {
    console.error(`Error on response: "${ error }"`);
  }
};
