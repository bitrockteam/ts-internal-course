import { getCharacters } from "../../exercise/api/rick-and-morty.service.js";
import {
  CharactersPaginatorOptions,
  PaginatedCharactersResponse,
} from "../models/paginator.models";

export async function* getCharactersPaginator(
  { page, direction }: CharactersPaginatorOptions = {
    page: 1,
    direction: 1,
  }
): AsyncGenerator<
  PaginatedCharactersResponse,
  PaginatedCharactersResponse,
  Partial<CharactersPaginatorOptions>
> {
  function changeDirection(newDir: -1 | 1) {
    direction = newDir;
  }
  function changePage(newPage: number) {
    currentPage = newPage >= 1 ? newPage : 1;
  }

  let currentPage: number;
  changePage(page);

  while (true) {
    const { direction: newDir, page: newPage } =
      (yield getCharacters(currentPage).then((res) => {
        const payload = { response: res, page: currentPage };
        if (res.info) {
          if (res.info.next && direction > 0) {
            changePage(currentPage + 1);
          } else if (res.info.prev && direction < 0) {
            changePage(currentPage - 1);
          } else {
            changeDirection(-direction as -1 | 1);
            changePage(currentPage + direction);
          }
        }
        return payload;
      })) || {};
    newDir != null && changeDirection(newDir);
    newPage != null && changePage(newPage);
  }
}
