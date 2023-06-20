import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birth month and day have already passed in the current year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

}
