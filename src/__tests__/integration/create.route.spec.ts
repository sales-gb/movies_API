import supertest from 'supertest'
import { DataSource } from 'typeorm'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import { Movie } from '../../entities'
import { iMovieRepo } from '../interfaces'
import { createRouteMock } from '../mocks'

describe('POST /movies', () => {
    let connection: DataSource

    const baseUrl: string = '/movies'
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error))
    })

    beforeEach(async () => {
        const movies: Movie[] = await movieRepo.find()
        await movieRepo.remove(movies)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('Success: Must be able to create a movie - Full body', async () => {
        const response = await supertest(app)
            .post(baseUrl)
            .send(createRouteMock.movieComplete)

        const expectResults = {
            status: 201,
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toEqual(
            expect.objectContaining(createRouteMock.movieComplete)
        )
        expect(response.body).toEqual(
            expect.objectContaining({ id: expect.any(Number) })
        )

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(1)
        expect(movies).toEqual(
            expect.arrayContaining([expect.objectContaining(response.body)])
        )
    })

    it('Success: Must be able to create a movie - Without "description"', async () => {
        const response = await supertest(app)
            .post(baseUrl)
            .send(createRouteMock.movieWithoutDescription)

        const expectResults = {
            status: 201,
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toEqual(
            expect.objectContaining(createRouteMock.movieWithoutDescription)
        )
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                description: null,
            })
        )

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(1)
        expect(movies).toEqual(
            expect.arrayContaining([expect.objectContaining(response.body)])
        )
    })

    it('Error: Must not be able to create a movie - Name already exists', async () => {
        await movieRepo.save(createRouteMock.movieUnique1)

        const response = await supertest(app)
            .post(baseUrl)
            .send(createRouteMock.movieUnique2)

        const expectResults = {
            status: 409,
            bodyMessage: { message: 'Movie already exists.' },
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toStrictEqual(expectResults.bodyMessage)

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(1)
        expect(movies).toEqual(expect.arrayContaining([]))
    })

    it('Error: Must not be able to create a movie - Invalid body', async () => {
        const response = await supertest(app)
            .post(baseUrl)
            .send(createRouteMock.movieInvalidBody)

        const expectResults = {
            status: 400,
            bodyMessage: {
                message: {
                    price: ['Required'],
                    name: ['Expected string, received number'],
                    duration: ['Expected number, received string'],
                },
            },
        }

        expect(response.status).toBe(expectResults.status)
        expect(response.body).toStrictEqual(expectResults.bodyMessage)

        const [movies, count] = await movieRepo.findAndCount()
        expect(count).toBe(0)
        expect(movies).toEqual(expect.arrayContaining([]))
    })

    it('Error: Must not be able to create a movie - Invalid body 2', async () => {
        const response = await supertest(app)
            .post(baseUrl)
            .send(createRouteMock.movieInvalidBody2)

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
        expect(count).toBe(0)
        expect(movies).toEqual(expect.arrayContaining([]))
    })
})
