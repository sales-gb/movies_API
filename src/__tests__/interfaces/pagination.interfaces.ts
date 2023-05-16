import { Movie } from '../../entities'

interface iPagination {
    prevPage: string | null
    nextPage: string | null
    count: number
    data: Movie[]
}

interface iPaginationParams {
    page: number
    perPage: number
    order: string
    sort: string
    prevPage: string | null
    nextPage: string | null
}

export { iPagination, iPaginationParams }
