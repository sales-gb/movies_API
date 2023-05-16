import { z } from 'zod';
import {
  listMoviesSchema,
  movieSchema,
  reqMovieSchema,
  updateMovieSchema,
} from '../schemas/movies.schemas';
import { DeepPartial } from 'typeorm';

type TMovie = z.infer<typeof movieSchema>;
type TMovieReq = z.infer<typeof reqMovieSchema>;
type TMovieUpdate = DeepPartial<TMovieReq>;

type TMovieList = z.infer<typeof listMoviesSchema>;

type TMoviePagination = {
  prevPage: string | null | undefined;
  nextPage: string | null | undefined;
  count: number;
  data: TMovieList;
};

export { TMovie, TMovieReq, TMovieUpdate, TMovieList, TMoviePagination };
