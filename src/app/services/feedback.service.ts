import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilm } from '../interfaces/film';

import { IFeedback } from '../interfaces/film';
import { map, Observable, shareReplay, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly baseUrl = 'http://localhost:3000/feedback';

  constructor(private http: HttpClient) {
  }

  public getFeedbacks(): Observable<IFeedback[]> {
    return this.http.get<IFeedback[]>(this.baseUrl).pipe(shareReplay(1));
  }

  public getFilmFeedback(filmId: number) {
    return this.http.get<IFeedback[]>(`${this.baseUrl}?filmId=${filmId}`);
  }

  public findFeedbackItem(filmId: number, userId: number): Observable<IFeedback>  {
    return this.http.get<IFeedback[]>(`${this.baseUrl}?filmId=${filmId}&userId=${userId}`)
    .pipe(
      map(result => result[0])
    );
  }

  public findFeedbackByUser (userId:number): Observable<IFeedback[]> {
    return this.http.get<IFeedback[]>(`${this.baseUrl}?userId=${userId}`);
  }

  public addFeedbackItem(filmId: number, userId: number, feedback: Partial<IFeedback>) {
    return this.http.post<IFeedback>(`${this.baseUrl}`, {...feedback, filmId, userId});
  }

  public updateFeedbackItem(id: number, feedback: Partial<IFeedback>) {
    return this.http.patch<IFeedback>(`${this.baseUrl}/${id}`, feedback);
  }

  public updateFilmFeedback(film: IFilm, userId: number, feedback: Partial<IFeedback>): Observable<IFeedback> {

    return this.findFeedbackItem(film.id, userId)
    .pipe(
      switchMap((fb) => {
        return fb ? this.updateFeedbackItem(fb.id, feedback) : this.addFeedbackItem(film.id, userId, feedback);
      })
    );
  }

}
