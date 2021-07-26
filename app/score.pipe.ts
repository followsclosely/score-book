import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === 'number') {
      return (value > 0 ) ? "+" + value : value;
    }
    else return value;
  }
}