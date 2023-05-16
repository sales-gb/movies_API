import { Repository } from 'typeorm';
import {
  TMovieList,
  TMoviePagination,
} from '../../interfaces/movies.interface';
import { Movie } from '../../entities';
import { AppDataSource } from '../../data-source';
import { listMoviesSchema } from '../../schemas/movies.schemas';

const listMovieService = async (payload: any): Promise<TMoviePagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let { page = 1, perPage = 5, sort, order } = payload;

  perPage = parseInt(perPage, 10);
  if (perPage <= 0 || perPage > 5 || !Number.isInteger(perPage)) {
    perPage = 5;
  }
  perPage = Math.min(perPage, 5);

  page = parseInt(page, 10);
  if (page <= 0 || !Number.isInteger(page)) {
    page = 1;
  }

  let movies: Movie[] | undefined;
  const count = await movieRepository.count();
  sort = sort === 'price' || sort === 'duration' ? sort : 'id';
  order = order === 'asc' || order === 'desc' ? order : 'asc';

  const take: number = Number(perPage);
  const skip: number = (Number(page) - 1) * take;

  if (sort === 'id') {
    order = 'asc';
  }

  if (!page && !perPage) {
    movies = await movieRepository.find();
  } else {
    movies = await movieRepository.find({
      take: take,
      skip: skip,
      order: {
        [sort]: order,
      },
    });
  }

  const returnMovies: TMovieList = listMoviesSchema.parse(movies);

  let prevPage: string | null = null;
  if (Number(page) > 1) {
    prevPage = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`;
  }

  let nextPage: string | null = null;
  if (Number(skip) + Number(take) < Number(count)) {
    nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${perPage}`;
  }

  return {
    nextPage: nextPage,
    prevPage: prevPage,
    count: count,
    data: returnMovies,
  };
};

export default listMovieService;
