import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieRouterlink'
})
export class MovieRouterlinkPipe implements PipeTransform {

  transform(value: string): string {
    let result = '';
    
    for (let i = 0; i < value.length; i++) {
      if (result[result.length - 1] === ':') {
        result += value[i].match(/\s/) ? '' : value[i].toLowerCase();
      } else {
        result += value[i].match(/\s/) ? '-' : value[i].toLowerCase();
      }
    }

    return result;
  }

}
