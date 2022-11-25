import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, shareReplay, switchMap } from 'rxjs';
import { IFeedback, IFilm } from '../interfaces/film';
import { IUser } from '../interfaces/user';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly baseUrl = 'http://localhost:3000/films';
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

  public getFilmWithoutRating(user:IUser) {
   this.http.get<IFilm[]>(this.baseUrl).pipe(
      map ((films) =>{
        let newFilm: IFilm[]=[]
        films.forEach ((film)=>{

        }
         )
      })

    )

  }

  public findFilmsByParams(params:string[]): Observable<IFilm[]> {
    const url = `${this.baseUrl}?viewing_like=false&genres_like=${params}`;
    console.log(url)
    return this.http.get<IFilm[]>(url);
  }

  public getFilmByID(id: number) {
    const url = `${this.baseUrl}/${String(id)}`;
    return this.http.get<IFilm>(url);
  }

  public addFilm(film: IFilm): any {
    const url = `${this.baseUrl}`;
    console.log (film)

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
      map((feedback) => ({ ...film, feedback }))
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
}
