import { Router } from 'express';
import {
  createMoviesController,
  deleteMovieController,
  listMovieController,
  updateMovieController,
} from '../controllers/movies.controllers';
import ensureMovieNameExistsMiddleware from '../middlewares/ensureMovieNameExists.middleware';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid.middleware';
import { reqMovieSchema, updateMovieSchema } from '../schemas/movies.schemas';
import ensureMovieExistMiddleware from '../middlewares/ensureMovieExist.middleware';

const moviesRoutes: Router = Router();

moviesRoutes.post(
  '',
  ensureBodyIsValidMiddleware(reqMovieSchema),
  ensureMovieNameExistsMiddleware,
  createMoviesController,
);
moviesRoutes.get('', listMovieController);
moviesRoutes.patch(
  '/:id',
  ensureBodyIsValidMiddleware(updateMovieSchema),
  ensureMovieNameExistsMiddleware,
  updateMovieController,
);
moviesRoutes.delete('/:id', deleteMovieController);

export default moviesRoutes;
