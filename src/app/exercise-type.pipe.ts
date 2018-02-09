import {Pipe, PipeTransform} from '@angular/core';
import {Exercise} from './exercise';

@Pipe({
  name: 'exerciseType'
})
export class ExerciseTypePipe implements PipeTransform {

  transform(items: Exercise[], searchText: string, typeSelect: string): Exercise[] {
    if (!items) { return []; }
    if (!searchText && typeSelect === '') { return items; }

    if (!searchText) {
      return items.filter( it => {
        return it['exerciseType'].name.toLowerCase().includes(typeSelect);
      });
    }
    if (searchText) {
      searchText = searchText.toLowerCase();
      const itemsSearchText = items.filter( it => {
        return it.name.toLowerCase().includes(searchText);
      });
      return itemsSearchText.filter( it => {
        return it['exerciseType'].name.toLowerCase().includes(typeSelect);
      });
    }
  }
}
