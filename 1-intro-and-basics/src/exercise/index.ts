import { getCharacters } from './api/rick-and-morty.service.js';

const res = await getCharacters();

const characters = res.results;

const charactersNames = characters.map(c => ({
  name: c.name,
  species: c.species,
  episodesCount: c.episode.length
}));

console.log({ charactersNames });

function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
let myFunction: (name: string) => void
myFunction = greet;
