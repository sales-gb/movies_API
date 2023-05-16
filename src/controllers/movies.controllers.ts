import { Request, Response } from 'express';
import {
  TMovie,
  TMovieReq,
  TMovieUpdate,
} from '../interfaces/movies.interface';
import createMovieService from '../services/movies/createMovie.service';
import listMovieService from '../services/movies/listMovies.service';
import updateMovieService from '../services/movies/updateMovie.service';
import deleteMovieService from '../services/movies/deleteMovie.service';

const createMoviesController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const movieData: TMovieReq = req.body;
  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const listMovieController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const payload: any = req.query;
  const movie = await listMovieService(payload);
  return res.json(movie);
};

const updateMovieController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const movieData: TMovieUpdate = req.body;
  const movieId: number = Number(req.params.id);

  const newMovieData: TMovie = await updateMovieService(movieData, movieId);

  return res.json(newMovieData);
};

const deleteMovieController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const movieId: number = Number(req.params.id);
  const deletedMovie = await deleteMovieService(movieId);

  return res.status(204).send();
};

export {
  createMoviesController,
  listMovieController,
  updateMovieController,
  deleteMovieController,
};
