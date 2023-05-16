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

  it("Query parameters: 'page' equals 0 and 'perPage' equals to 0", async () => {
    const response = await supertest(app).get(baseUrl + '?page=0&perPage=0');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 1 and 'perPage' equals to 3", async () => {
    const response = await supertest(app).get(baseUrl + '?page=1&perPage=3');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page1PerPage3,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 3 and 'perPage' equals to 2", async () => {
    const response = await supertest(app).get(baseUrl + '?page=3&perPage=2');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page3PerPage2,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("Query parameters: 'page' equals 4 and 'perPage' equals to 4", async () => {
    const response = await supertest(app).get(baseUrl + '?page=4&perPage=4');

    const expectResults = {
      status: 200,
      bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page4PerPage4,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });
});
