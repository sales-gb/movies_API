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

  it('Without query parameters', async () => {
    const response = await supertest(app).get(baseUrl);

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 0 and without 'perPage'", async () => {
    const response = await supertest(app).get(baseUrl + '?page=0');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 1 and without 'perPage'", async () => {
    const response = await supertest(app).get(baseUrl + '?page=1');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 2 and without 'perPage'", async () => {
    const response = await supertest(app).get(baseUrl + '?page=2');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page2,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 3 and without 'perPage'", async () => {
    const response = await supertest(app).get(baseUrl + '?page=3');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page3,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 4 and without 'perPage'", async () => {
    const response = await supertest(app).get(baseUrl + '?page=4');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page4,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 'invalidInput' and without 'perPage'", async () => {
    const response = await supertest(app).get(baseUrl + '?page=invalidInput');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals -1 and without 'perPage'", async () => {
    const response = await supertest(app).get(baseUrl + '?page=-1');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });
});
