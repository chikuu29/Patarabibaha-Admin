import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatdropdown'
})
export class FormatdropdownPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
  
    if(value.name){
      return value.name
    }
    return value;
  }

}
