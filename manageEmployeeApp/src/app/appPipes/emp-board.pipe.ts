import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empBoard',
})
export class EmpBoardPipe implements PipeTransform {
  transform(value: any, searchTerm: any): any {
    if (value.length === 0) {
      return value;
    }
    return value.filter((search: any) => {
      return search.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
