import { Repository } from 'typeorm';
import { Movie } from '../../entities';
import { TMovie, TMovieUpdate } from '../../interfaces/movies.interface';
import { AppDataSource } from '../../data-source';
import { movieSchema } from '../../schemas/movies.schemas';
import { AppError } from '../../error';

const updateMovieService = async (
  movieData: TMovieUpdate,
  movieId: number,
): Promise<Movie> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | null = await movieRepository.findOne({
    where: {
      id: movieId,
    },
  });

  if (!oldMovieData) {
    throw new AppError('Movie not found', 404);
  }

  const newMovieData: Movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await movieRepository.save(newMovieData);

  const returnMovie: TMovie = movieSchema.parse(newMovieData);

  return returnMovie;
};

export default updateMovieService;
