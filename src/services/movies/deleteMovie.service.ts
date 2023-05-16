import { Response } from 'express';
import { Repository } from 'typeorm';
import { Movie } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const deleteMovieService = async (
  movieId: number,
): Promise<Response | void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const toDelete: Movie | null | undefined = await movieRepository.findOne({
    where: {
      id: movieId,
    },
  });

  if (!toDelete) {
    throw new AppError('Movie not found', 404);
  }

  await movieRepository.delete(movieId);
};

export default deleteMovieService;
