import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatdropdown'
})
export class FormatdropdownPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value && value.name) {  // Ensure value is not null or undefined
      return value.name;
    }
    return value;
  }

}
