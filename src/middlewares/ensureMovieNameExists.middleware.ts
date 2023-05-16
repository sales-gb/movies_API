import { NextFunction, Request, Response } from 'express';
import { Movie } from '../entities';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { AppError } from '../error';

const ensureMovieNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const movieName = req.body.name;

  if (movieName) {
    const movieRepository: Repository<Movie> =
      AppDataSource.getRepository(Movie);

    const verifyName: Movie | null = await movieRepository.findOne({
      where: {
        name: movieName,
      },
    });

    if (verifyName) {
      throw new AppError('Movie already exists.', 409);
    }
  }

  return next();
};

export default ensureMovieNameExistsMiddleware;
