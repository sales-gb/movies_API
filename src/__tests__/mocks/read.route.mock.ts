import { DeepPartial, Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Movie } from '../../entities';

type iMovieRepo = Repository<Movie>;
type iMovieDeepPartial = DeepPartial<Movie>;

interface iPaginationBase {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
}

interface iPagination extends iPaginationBase {
  data: Movie[];
}

type iPaginationTemplate = Record<string, iPagination>;
type iReadPaginationMock = Promise<Record<string, iPaginationTemplate>>;

const readPaginationMock = async (): iReadPaginationMock => {
  const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie);
  const moviesTotal: number = 11;

  let uniqueDurations: number[] = [];
  let uniquePrices: number[] = [];

  const moviesTemplate: Movie[] = await movieRepo.save(
    Array.from(Array(moviesTotal))
      .map((val, index): iMovieDeepPartial => {
        let price = Math.ceil(Math.random() * 100);
        let duration = Math.ceil(Math.random() * 100);

        while (uniquePrices.includes(price)) {
          price = Math.ceil(Math.random() * 100);
        }

        while (uniqueDurations.includes(duration)) {
          duration = Math.ceil(Math.random() * 100);
        }

        uniquePrices.push(price);
        uniqueDurations.push(duration);

        const name: string = `Filme ${String(index + 1).padStart(2, '0')}`;

        return { id: expect.any(Number), name, duration, price };
      })
      .map(({ id, ...el }) => el)
  );

  const paginationBase: iPaginationBase = {
    prevPage: null,
    nextPage: null,
    count: moviesTotal,
  };

  const paginationSortPrice: iPaginationTemplate = {
    priceDefault: {
      ...paginationBase,
      nextPage: 'http://localhost:3000/movies?page=2&perPage=5',
      data: moviesTemplate.sort((a, b) => a.price - b.price).slice(0, 5),
    },
    priceOrderDesc: {
      ...paginationBase,
      nextPage: 'http://localhost:3000/movies?page=2&perPage=5',
      data: moviesTemplate.sort((a, b) => b.price - a.price).slice(0, 5),
    },
    durationDefault: {
      ...paginationBase,
      nextPage: 'http://localhost:3000/movies?page=2&perPage=5',
      data: moviesTemplate.sort((a, b) => a.duration - b.duration).slice(0, 5),
    },
    durationOrderDesc: {
      ...paginationBase,
      nextPage: 'http://localhost:3000/movies?page=2&perPage=5',
      data: moviesTemplate.sort((a, b) => b.duration - a.duration).slice(0, 5),
    },
  };

  const paginationPagePerPage: iPaginationTemplate = {
    default: {
      ...paginationBase,
      nextPage: 'http://localhost:3000/movies?page=2&perPage=5',
      data: moviesTemplate.sort((a, b) => a.id - b.id).slice(0, 5),
    },
    page2: {
      ...paginationBase,
      prevPage: 'http://localhost:3000/movies?page=1&perPage=5',
      nextPage: 'http://localhost:3000/movies?page=3&perPage=5',
      data: moviesTemplate.sort((a, b) => a.id - b.id).slice(5, 10),
    },
    page3: {
      ...paginationBase,
      prevPage: 'http://localhost:3000/movies?page=2&perPage=5',
      nextPage: null,
      data: moviesTemplate.sort((a, b) => a.id - b.id).slice(10),
    },
    page4: {
      ...paginationBase,
      prevPage: 'http://localhost:3000/movies?page=3&perPage=5',
      nextPage: null,
      data: [],
    },
    perPage1: {
      ...paginationBase,
      nextPage: 'http://localhost:3000/movies?page=2&perPage=1',
      data: moviesTemplate.sort((a, b) => a.id - b.id).slice(0, 1),
    },
    perPage3: {
      ...paginationBase,
      nextPage: 'http://localhost:3000/movies?page=2&perPage=3',
      data: moviesTemplate.sort((a, b) => a.id - b.id).slice(0, 3),
    },
    page1PerPage3: {
      ...paginationBase,
      nextPage: 'http://localhost:3000/movies?page=2&perPage=3',
      data: moviesTemplate.sort((a, b) => a.id - b.id).slice(0, 3),
    },
    page3PerPage2: {
      ...paginationBase,
      prevPage: 'http://localhost:3000/movies?page=2&perPage=2',
      nextPage: 'http://localhost:3000/movies?page=4&perPage=2',
      data: moviesTemplate.sort((a, b) => a.id - b.id).slice(4, 6),
    },
    page4PerPage4: {
      ...paginationBase,
      prevPage: 'http://localhost:3000/movies?page=3&perPage=4',
      nextPage: null,
      data: [],
    },
  };

  return { paginationSortPrice, paginationPagePerPage };
};

export default { readPaginationMock };
