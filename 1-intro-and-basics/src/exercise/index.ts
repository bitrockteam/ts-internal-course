import { getCharacters } from './api/rick-and-morty.service.js';
import { CharacterSummary } from './models/rick-and-morty.models';

const res = await getCharacters();

const characters = res.results;

const charactersNames: Array<CharacterSummary> = characters.map(c => ({
  name: c.name,
  species: c.species,
  episodesCount: c.episode.length
}));

console.log({ charactersNames });
