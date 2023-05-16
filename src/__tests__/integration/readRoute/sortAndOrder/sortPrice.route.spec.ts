import supertest from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../../../app';
import { AppDataSource } from '../../../../data-source';
import { readRouteMock } from '../../../mocks';

describe('Tests on route: GET /movies. Must be able to list all movies.', () => {
  let connection: DataSource;
  const baseUrl: string = '/movies';
  let readRoutePaginationMocks: { [key: string]: any };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;
        readRoutePaginationMocks = await readRouteMock.readPaginationMock();
      })
      .catch((error) => console.error(error));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Query parameters: 'sort' equals 'price' and without 'order'", async () => {
    const response = await supertest(app).get(baseUrl + '?sort=price');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationSortPrice.priceDefault,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'sort' equals 'price' and 'order' equals 'asc'", async () => {
    const response = await supertest(app).get(
      baseUrl + '?sort=price&order=asc'
    );

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationSortPrice.priceDefault,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'sort' equals 'price' and 'order' equals 'desc'", async () => {
    const response = await supertest(app).get(
      baseUrl + '?sort=price&order=desc'
    );

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationSortPrice.priceOrderDesc,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });
});
