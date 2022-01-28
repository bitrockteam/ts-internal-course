import { getCharacters } from '../../exercise/api/rick-and-morty.service.js';
import {
  CharactersPaginatorOptions, Direction,
  PaginatedCharactersResponse,
} from '../models/paginator.models';

export async function* getCharactersPaginator(
  { page, direction }: CharactersPaginatorOptions = {
    page: 1,
    direction: 1,
  }
): AsyncGenerator<PaginatedCharactersResponse,
  PaginatedCharactersResponse,
  Partial<CharactersPaginatorOptions>> {

  let currentPage: number;

  const changeDirection = (newDir: Direction): Direction => direction = newDir;

  const changePage = (newPage: number): number => currentPage = newPage >= 1 ? newPage : 1;

  const hasNextPage = ({ next, direction }: { next: string; direction: Direction }): boolean => !!next && direction > 0;

  const hasPrevPage = ({ prev, direction }: { prev: string; direction: Direction }): boolean => !!prev && direction < 0;

  changePage(page);

  while(true) {
    const { direction: newDir, page: newPage } =
    (yield getCharacters(currentPage).then((res) => {
      const payload = { response: res, page: currentPage };
      if(res.info) {
        const { next, prev } = res?.info;
        if(hasNextPage({ next, direction })) {
          changePage(currentPage + 1);
        } else if(hasPrevPage({ prev, direction })) {
          changePage(currentPage - 1);
        } else {
          changeDirection(-direction as Direction);
          changePage(currentPage + direction);
        }
      }
      return payload;
    })) || {};
    !!newDir && changeDirection(newDir);
    !!newPage && changePage(newPage);
  }
}
