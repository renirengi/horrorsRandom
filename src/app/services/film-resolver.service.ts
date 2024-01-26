import { Injectable } from '@angular/core';
import { IFilm } from '../interfaces/film';
import { Observable, switchMap } from 'rxjs'
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from '@angular/router';
import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class FilmResolverService implements Resolve<IFilm[]> {

  constructor(private activeRoute: ActivatedRoute, private filmService: FilmService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IFilm[] | Observable<IFilm[]> | Promise<IFilm[]> {
    console.log(route)
    return this.activeRoute.queryParams.pipe(
      switchMap(queryParams => {
        const page = queryParams['page'] | 1;
        console.log(queryParams)
        return this.filmService.getFilmsByParams(this.getFilterParams(queryParams), page);
      })
    );
  }

  private getFilterParams(queryParams: Params) {
    const listFilters = ['countries', 'genres', 'director', 'year', 'rating'];
    const rangeFilters = ['rating'];
    const stringFIlters = ['searchString'];

    const listConverter = (key: string, values: string|string[]) => {
      const keyString = `${key}_like`;
      const valueString = Array.isArray(values) ? values.reduce((acc, val, i) => (i === 0 ? `(${val})` : `${acc}|(${val})`), '') : values;

      return valueString !== '()' ? { [keyString]: valueString } : {};
    };
    const rangeConverter = (key: string, value: string) => {
      const values = value.split(',');
      return { [`${key}_gte`]: values[0], [`${key}_lte`]: values[1] };
    };
    const searchStringConverter = (value: string) => {
      return { q: value };
    };

    const paramsReducer = (params: {[index: string]: string}, [key, value]: any[]) => {
      let newParams: {[index: string]: string};
      const filterKeys = [...listFilters, ...rangeFilters,  ...stringFIlters];

      if (filterKeys.includes(key) && value !== undefined) {
        if (key === 'searchString') {
          newParams = searchStringConverter(value);
        } else {
          newParams = listConverter(key, value);
        }

        params = {...params, ...newParams};
      }

      return params;
    }

    return Object.entries(queryParams).reduce(paramsReducer, {});
  }

}
