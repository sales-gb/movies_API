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

  it("Query parameters: 'perPage' equals 0 and without 'page'", async () => {
    const response = await supertest(app).get(baseUrl + '?perPage=0');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'perPage' equals 1 and without 'page'", async () => {
    const response = await supertest(app).get(baseUrl + '?perPage=1');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.perPage1,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'perPage' equals 3 and without 'page'", async () => {
    const response = await supertest(app).get(baseUrl + '?perPage=3');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.perPage3,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'perPage' equals 5 and without 'page'", async () => {
    const response = await supertest(app).get(baseUrl + '?perPage=5');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'perPage' equals 6 and without 'page'", async () => {
    const response = await supertest(app).get(baseUrl + '?perPage=6');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'perPage' equals 'invalidInput' and without 'page'", async () => {
    const response = await supertest(app).get(
      baseUrl + '?perPage=invalidInput'
    );

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'perPage' equals -1 and without 'page'", async () => {
    const response = await supertest(app).get(baseUrl + '?perPage=-1');

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
