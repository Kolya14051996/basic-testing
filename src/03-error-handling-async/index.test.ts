import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const providedValue = 'value';
    const returnedValue = await resolveValue(providedValue);
    expect(returnedValue).toBe(providedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedValue = 'hello';
    expect(() => throwError(providedValue)).toThrowError(providedValue);
  });

  test('should throw error with default message if message is not provided', () => {
    const providedValue = undefined;
    expect(() => throwError(providedValue)).toThrowError(/Oops!/);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
