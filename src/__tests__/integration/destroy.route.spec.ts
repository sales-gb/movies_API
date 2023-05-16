import supertest from 'supertest'
import { DataSource } from 'typeorm'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import { Movie } from '../../entities'
import { iMovieRepo } from '../interfaces'
import { deleteRouteMock } from '../mocks'

describe('DELETE /movies', () => {
    let connection: DataSource

    let deleteUrl: string
    const baseUrl: string = '/movies'
    const deleteInvalidIDUrl: string = baseUrl + '/123456'

    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    let movieDelete: Movie

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error))
    })

    beforeEach(async () => {
        const movies: Movie[] = await movieRepo.find()
        await movieRepo.remove(movies)

        movieDelete = await movieRepo.save(deleteRouteMock.movieTemplate)
        deleteUrl = baseUrl + `/${movieDelete.id}`
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('Success: Must be able to delete a movie', async () => {
        const response = await supertest(app).delete(deleteUrl)

        const expectResults = { status: 204 }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toStrictEqual({})

        const [movies, count] = await movieRepo.findAndCount()

        expect(count).toBe(0)
        expect(movies).toStrictEqual(expect.arrayContaining([]))
    })

    it("Error: Must not be able to delete a movie - ID doesn't exists", async () => {
        const response = await supertest(app).patch(deleteInvalidIDUrl)

        const expectResults = {
            status: 404,
            bodyMessage: { message: 'Movie not found' },
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toStrictEqual(expectResults.bodyMessage)

        const [movies, count] = await movieRepo.findAndCount()

        expect(count).toBe(1)
        expect(movies).toStrictEqual(
            expect.arrayContaining([expect.objectContaining(movieDelete)])
        )
    })
})
