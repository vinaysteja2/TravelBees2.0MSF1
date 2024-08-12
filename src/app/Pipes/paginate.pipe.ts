import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  
    transform(array: any[], pageSize: number, pageNumber: number): any[] {
      if (!array.length) return [];
      pageNumber = pageNumber - 1; // Angular pipes use 1-based indexing for pages
      return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    }
}
