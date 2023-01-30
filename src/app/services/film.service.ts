import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Params } from '@angular/router';

import { TFilterName } from  '../interfaces';
import { IFeedback, IFilm } from '../interfaces/film';
import { IUser } from '../interfaces/user';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly baseUrl = 'http://localhost:3000/films';
  private userBaseUrl = 'http://localhost:3000/films';
  public readonly filmsSearchString$ = new BehaviorSubject<string>('');

  public set dollsSearchString(str: string) {
    this.filmsSearchString$.next(str);
  }

  constructor(
    private http: HttpClient,
    private feedback: FeedbackService
  ) { }

  public getAllFilms(): Observable<IFilm[]> {
    return this.http.get<IFilm[]>(this.baseUrl).pipe(shareReplay(1));
  }

  public getFilmWithoutRating(user:IUser): Observable<IFilm[]> {
    let str = '';
    let arr: number[] = [];
    if ((user.userFilms?.veto && user.userFilms.viewing)&&(user.userFilms?.veto.length>0 && user.userFilms.viewing.length>0)) {
      arr = arr.concat(user.userFilms.veto,user.userFilms.viewing);
      str = arr.toString().replace(/,/g, '&id_ne=');
    }
    else if (user.userFilms?.veto && user.userFilms?.veto.length>0) {
      str = user.userFilms?.veto.toString();
    }
    else if (user.userFilms?.viewing && user.userFilms?.viewing.length>0) {
      str = user.userFilms?.viewing.toString();

    }
    str = str.replace(/,/g, '&id_ne=');
    this.userBaseUrl  = `${this.baseUrl}?id_ne=${str}`;
    return  this.http.get<IFilm[]>(this.userBaseUrl).pipe(shareReplay(1));
  }


  public findFilmsByParamsWithUserParams(params:string[], user: IUser): Observable<IFilm[]> {
    this.getFilmWithoutRating(user);
    const newUrl = `${this.userBaseUrl}?genres_like=${params}`;
    return this.http.get<IFilm[]>(newUrl);
  }

  public findFilmsByParams(params:string[]): Observable<IFilm[]> {
    const newUrl = `${this.baseUrl}?genres_like=${params}`;
    return this.http.get<IFilm[]>(newUrl);
  }

  public getFilmByID(id: number) {
    const url = `${this.baseUrl}/${String(id)}`;
    return this.http.get<IFilm>(url);
  }

  public addFilm(film: IFilm): any {
    const url = `${this.baseUrl}`;

    return this.http.post<IFilm>(url, {...film});
  }

  public updateFilm(film: IFilm): Observable<IFilm> {
    return this.http.patch<IFilm>(`${this.baseUrl}/${film.id}`, film);
  }

  public updateFilmFeedback(film: IFilm, userId: number, feedback: Partial<IFeedback>): Observable<IFilm> {
    return this.feedback.updateFilmFeedback(film, userId, feedback).pipe(
      switchMap(() => {
        return this.feedback.getFilmFeedback(film.id);
      }),
      map((feedback) => ({...film, feedback}))
    );
  }

  public getAvailable(value: string): Observable<string[]> {
    return this.http.get<IFilm[]>('http://localhost:3000/films').pipe(
      map((films) => {
        const tags = new Set();
        if (value === 'genres') {
          films.forEach((film) => {
            film.genres.forEach((f) =>tags.add(f));
          });
        }
        return Array.from(tags).sort() as string[];
      }))
    }

    public getFilmsByParams(params: { [key: string]: string }, page: number = 1 ): Observable<IFilm[]> {
      params = { ...params, page: page.toString() };

      return this.http.get<IFilm[]>(this.baseUrl, { params });
    }

    public getAvailableFilterValues(keys: TFilterName[]): Observable<{[index: string]: any[]}> {
      return this.getAllFilms().pipe(
        map((films) => {
          const valueSets = keys.reduce((acc: {[index: string]: Set<any>}, key) => {
            acc[key] = new Set();

            return acc;
          }, {});

          films.forEach(film => keys.forEach(key => {
            if (Array.isArray(film[key])) {
              (film[key] as Array<any>).forEach(item => valueSets[key].add(item));
            } else {
              valueSets[key].add(film[key]);
            }
          }));

          const valueArrays = keys.reduce((acc: {[index: string]: any[]}, key) => {
            acc[key] = Array.from(valueSets[key]).sort();

            return acc;
          }, {});

          return valueArrays;
        })
      );
    }

    /** Loading films related to applied filters */
  public getFilteredFilms(queryParams: Params): Observable<IFilm[]> {
    const page = queryParams['page'] | 1;
    console.log (1)
    return this.getFilmsByParams(this.getFilterParams(queryParams), page);
  }

  /** Transforms query params to films request params object */
  private getFilterParams(queryParams: Params): {[index: string]: string} {
    const listFilters = ['countries', 'genres', 'director','year', 'rating'];
    ///const rangeFilters = ['rating'];
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
      const filterKeys = [...listFilters, ...stringFIlters];

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

  public getFilms(filmsIds: number[]): Observable<Pick<IFilm, 'id'|'rusTitle'|'urlPoster'| 'year'|'title'>[]> {
    const paramsStr = filmsIds.map(id => `id=${id}`).join('&');

    return this.http.get<IFilm[]>(`${this.baseUrl}?${paramsStr}`).pipe(
      map((films) => films.map(({id, rusTitle, urlPoster, year, title}) => ({id, rusTitle, urlPoster, year, title})))
    );
  }
}
