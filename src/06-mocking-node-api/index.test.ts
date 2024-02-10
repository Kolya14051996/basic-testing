// Uncomment the code below and write your tests doStuffByTimeout,readFileAsynchronously,

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path, { join } from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const cb = () => 'test';
    const timeout = 1000;

    const mockedTimeout = jest.fn(doStuffByTimeout);
    const mockedCb = jest.fn(cb);

    mockedTimeout(mockedCb, timeout);
    expect(mockedCb).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockedCb).toHaveBeenCalled();
    expect(mockedCb).toReturnWith('test');
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const mockedInterval = jest.fn(doStuffByTimeout);

    mockedInterval(callback, 1000);

    expect(mockedInterval).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    expect.assertions(1);

    doStuffByInterval(callback, 1000);

    jest.advanceTimersToNextTimer(5);

    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = 'file.txt';
    jest.spyOn(path, 'join');

    await readFileAsynchronously(filePath)
    expect(join).toHaveBeenCalledWith(__dirname, filePath)
  });

  test('should return null if file does not exist', async () => {
   const nonExistFile = 'hello.txt'
   const result = await readFileAsynchronously(nonExistFile)
   expect(result).toBeNull()
  });

  test('should return file content if file exists', async () => {
    const content= 'hello world';
     const readFileAsynchronously = jest.fn().mockResolvedValue(content)
    const result = await(readFileAsynchronously(content))
    expect(result).toBe(content)
  });
});
