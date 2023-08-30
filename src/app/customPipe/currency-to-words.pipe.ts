import { Pipe, PipeTransform } from '@angular/core';
const num2words = require('num2words');

@Pipe({
  name: 'currencyToWords'
})
export class CurrencyToWordsPipe implements PipeTransform {
  transform(value: number, currency: string = 'INR'): string {
    const options = { lang: 'en' }; // Set the language to English or your preferred language

    const words = num2words.numToWords(value, options);
    const currencyWords = `${words} ${currency}`;

    return currencyWords;
  }
}
