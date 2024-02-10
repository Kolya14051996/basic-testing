import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const create = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('users');

    expect(create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    const get = jest.spyOn(axiosClient, 'get');
    const create = jest.spyOn(axios, 'create');
    create.mockReturnValue(axiosClient);

    await throttledGetDataFromApi('users');

    expect(get).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(get).toHaveBeenCalledWith('users');
  });

  test('should return response data', async () => {
    const data = { data: 'ras' };
    const axiosClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    const get = jest.spyOn(axiosClient, 'get');
    const create = jest.spyOn(axios, 'create');
    create.mockReturnValue(axiosClient);
    get.mockReturnValue(Promise.resolve(data));

    expect(await throttledGetDataFromApi('users')).toBe(data.data);
    expect(get).toHaveBeenCalled();
  });
});
