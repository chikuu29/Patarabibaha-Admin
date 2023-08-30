import { CurrencyToWordsPipe } from './currency-to-words.pipe';

describe('CurrencyToWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyToWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
