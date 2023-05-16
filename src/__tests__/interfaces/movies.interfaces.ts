import { DeepPartial, Repository } from 'typeorm'
import { Movie } from '../../entities'

type iMovieCreate = {
    name: string
    duration: number
    price: number
    description?: string | undefined
}
type iMovieUpdate = DeepPartial<Movie>
type iMovieRepo = Repository<Movie>

export { iMovieCreate, iMovieUpdate, iMovieRepo }
