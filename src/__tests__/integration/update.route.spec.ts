import supertest from 'supertest'
import { DataSource } from 'typeorm'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import { Movie } from '../../entities'
import { iMovieRepo } from '../interfaces'
import { updateRouteMock } from '../mocks'

describe('PATCH /movies', () => {
    let connection: DataSource

    let updateUrl: string
    const baseUrl: string = '/movies'
    const updateInvalidIDUrl: string = baseUrl + '/123456'

    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    let movieUpdate: Movie

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error))
    })

    beforeEach(async () => {
        const movies: Movie[] = await movieRepo.find()
        await movieRepo.remove(movies)

        movieUpdate = await movieRepo.save(updateRouteMock.movieTemplate)
        updateUrl = baseUrl + `/${movieUpdate.id}`
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('Success: Must be able to update a movie - Full body', async () => {
        const response = await supertest(app)
            .patch(updateUrl)
            .send(updateRouteMock.movieComplete)

        const expectResults = {
            status: 200,
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toEqual(
            expect.objectContaining(updateRouteMock.movieComplete)
        )
        expect(response.body).toEqual(
            expect.objectContaining({ id: movieUpdate.id })
        )

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(1)
        expect(movies).toEqual(
            expect.arrayContaining([expect.objectContaining(response.body)])
        )
    })

    it('Success: Must be able to update a movie - Partial information', async () => {
        const response = await supertest(app)
            .patch(updateUrl)
            .send(updateRouteMock.moviePartial)

        const expectResults = {
            status: 200,
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toEqual(
            expect.objectContaining(updateRouteMock.moviePartial)
        )
        expect(response.body).toEqual(
            expect.objectContaining({
                id: movieUpdate.id,
                name: movieUpdate.name,
                description: movieUpdate.description,
            })
        )

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(1)
        expect(movies).toEqual(
            expect.arrayContaining([expect.objectContaining(response.body)])
        )
    })

    it("Error: Must not be able to update a movie - ID doesn't exists", async () => {
        const response = await supertest(app).patch(updateInvalidIDUrl)

        const expectResults = {
            status: 404,
            bodyMessage: { message: 'Movie not found' },
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toStrictEqual(expectResults.bodyMessage)

        const [movies, count] = await movieRepo.findAndCount()

        expect(count).toBe(1)
        expect(movies).toStrictEqual(
            expect.arrayContaining([expect.objectContaining(movieUpdate)])
        )
    })

    it('Error: Must not be able to update a movie - Name already exists', async () => {
        const response = await supertest(app)
            .patch(updateUrl)
            .send(updateRouteMock.movieUnique)

        const expectResults = {
            status: 409,
            bodyMessage: { message: 'Movie already exists.' },
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toStrictEqual(expectResults.bodyMessage)

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(1)
        expect(movies).toEqual(
            expect.arrayContaining([expect.objectContaining(movieUpdate)])
        )
    })

    it('Error: Must not be able to update a movie - Invalid body', async () => {
        const response = await supertest(app)
            .patch(updateUrl)
            .send(updateRouteMock.movieInvalidBody)

        const expectResults = {
            status: 400,
            bodyMessage: {
                message: {
                    name: ['Expected string, received number'],
                    duration: ['Expected number, received string'],
                },
            },
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toStrictEqual(expectResults.bodyMessage)

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(1)
        expect(movies).toEqual(
            expect.arrayContaining([expect.objectContaining(movieUpdate)])
        )
    })

    it('Error: Must not be able to update a movie - Invalid body 2', async () => {
        const response = await supertest(app)
            .patch(updateUrl)
            .send(updateRouteMock.movieInvalidBody2)

        const expectResults = {
            status: 400,
            bodyMessage: {
                message: {
                    duration: ['Number must be greater than 0'],
                    name: ['String must contain at most 50 character(s)'],
                    price: ['Expected integer, received float'],
                },
            },
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toStrictEqual(expectResults.bodyMessage)

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(1)
        expect(movies).toEqual(
            expect.arrayContaining([expect.objectContaining(movieUpdate)])
        )
    })
})
