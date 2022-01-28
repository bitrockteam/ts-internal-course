import { getCharactersPaginator } from "./api/paginator.service.js";

const charactersPaginator = getCharactersPaginator({
  page: 10,
  direction: 1,
});

for (let i = 0; i < 5; i++) {
  const { response, page } = (
    await charactersPaginator.next(i === 2 ? { page: 20, direction: -1 } : null)
  ).value;
  const names = response.results.map(({ name }) => name);
  console.log(`Page ${page}: ${names.join(", ")}`);
}
