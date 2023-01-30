import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IFilm } from '../interfaces/film';

@Injectable({
  providedIn: 'root'
})
export class BufferService {
  private readonly baseUrl = 'http://localhost:3000/buffer';

  constructor(
    private http: HttpClient
  ) { }

  public getAllBufferFilms(): Observable<IFilm[]> {
    return this.http.get<IFilm[]>(this.baseUrl).pipe(shareReplay(1));
  }

  public addBufferFilm(film: IFilm): any {
    const url = `${this.baseUrl}`;

    return this.http.post<IFilm>(url, {...film});
  }

  public updateBufferFilm(film: IFilm): Observable<IFilm> {
    return this.http.patch<IFilm>(`${this.baseUrl}/${film.id}`, film);
  }

  public getBufferFilmByID(id: number) {
    const url = `${this.baseUrl}/${String(id)}`;
    return this.http.get<IFilm>(url);
  }

  public deleteBufferFilmByID(id: number) {
    const url = `${this.baseUrl}/${String(id)}`;
    return this.http.delete<IFilm>(url);
  }

}
