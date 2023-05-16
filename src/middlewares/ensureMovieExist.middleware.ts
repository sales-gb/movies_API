import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';
import { AppError } from '../error';

const ensureMovieExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { movieId } = req.params;
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const verifyMovie: Movie | null = await movieRepository.findOne({
    where: {
      id: Number(movieId),
    },
  });

  if (!verifyMovie) {
    throw new AppError('Movie not found', 404);
  }

  res.locals.movie = verifyMovie;

  return next();
};

export default ensureMovieExistMiddleware;
