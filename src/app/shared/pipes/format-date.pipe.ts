import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: number | null): number | null | string {
    try {
      if (value) {
        return new Date(value).toLocaleString('en-In', {dateStyle: "medium", timeStyle: "short"});
      }
      return value;
    } catch (e) {
      return value;
    }
  }

}
