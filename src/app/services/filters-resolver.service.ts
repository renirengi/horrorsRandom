import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, map, Observable, of } from 'rxjs';
import { IFilterConfig } from '../interfaces';
import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersResolverService implements Resolve<IFilterConfig[]> {

  private readonly filterConfigs: IFilterConfig[] = [
    { name: 'genres', title: 'Сортировка по тэгам', type: 'list', options: []},
    { name: 'director', title: 'Сортировка по режиссёрам', type: 'list', options: []},
    { name: 'year', title: 'Сортировка по годам', type: 'range', options: []},
    { name: 'countries', title: 'Сортировка по странам', type: 'list', options: []},
    { name: 'rating', title: 'Cортировка по годам', type: 'range', options: []},
  ];

  constructor(private filmService: FilmService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IFilterConfig[] | Observable<IFilterConfig[]> | Promise<IFilterConfig[]> {
    const filterNames = this.filterConfigs.map(config => config.name);
    const filtersOptions$ = this.filmService.getAvailableFilterValues(filterNames);

    return filtersOptions$.pipe(
      map(filterOptions => {
        return this.filterConfigs.map(config => {
          const name = config.name;
          const options = this.arrayToOption(filterOptions[name]);

          return {...config, options };
        });
      })
    );
  }

  private arrayToOption(values: any[]) {
    return values.map((value) => ({ value, text: value }));
  }

}
