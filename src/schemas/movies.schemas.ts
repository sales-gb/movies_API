import { number, z } from 'zod';

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const reqMovieSchema = movieSchema.omit({ id: true });

const updateMovieSchema = reqMovieSchema.partial();

const listMoviesSchema = z.array(movieSchema);

export { movieSchema, reqMovieSchema, updateMovieSchema, listMoviesSchema };
