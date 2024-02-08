// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 400;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 400;
    const withdraw = 500;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(withdraw)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 400;
    const transfer = 500;
    const account = getBankAccount(balance);
    const secondAcc = getBankAccount(transfer);
    expect(() => account.transfer(transfer, secondAcc)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 400;
    const transfer = 500;
    const account = getBankAccount(balance);
    expect(() => account.transfer(transfer, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 400;
    const account = getBankAccount(balance);
    const deposit = 100;
    account.deposit(deposit);

    expect(account.getBalance()).toBe(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 400;
    const account = getBankAccount(balance);
    const deposit = 100;
    account.withdraw(deposit);

    expect(account.getBalance()).toBe(balance - deposit);
  });

  test('should transfer money', () => {
    const balance = 400;
    const account = getBankAccount(balance);
    const deposit = 100;
    const secondAccount = getBankAccount(balance);
    account.transfer(deposit, secondAccount);

    expect(account.getBalance()).toBe(balance - deposit);
    expect(secondAccount.getBalance()).toBe(balance + deposit);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(500);
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    
    expect(typeof  await account.fetchBalance()).toBe('number');
  });
 

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(500);
    const balance = account.getBalance();
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    await account.synchronizeBalance()
    const newBalance = account.getBalance()
    expect(balance).not.toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(500);
    jest.spyOn(lodash, 'random').mockReturnValue(0);
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
