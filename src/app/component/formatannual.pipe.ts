import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatannual'
})
export class FormatannualPipe implements PipeTransform {

  transform(name: unknown,options: any[], ...args: unknown[]): unknown {
    const option = options.find(opt => opt.value === name);
    if (option) {
      return option.name;
    } else {
      return 'Unknown';
    }

    return null;
  }

}
