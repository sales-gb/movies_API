import { Repository } from 'typeorm';
import { TMovie, TMovieReq } from '../../interfaces/movies.interface';
import { Movie } from '../../entities';
import { AppDataSource } from '../../data-source';
import { movieSchema } from '../../schemas/movies.schemas';

const createMovieService = async (movieData: TMovieReq): Promise<TMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);

  const returnMovie: TMovie = movieSchema.parse(movie);

  return returnMovie;
};

export default createMovieService;
