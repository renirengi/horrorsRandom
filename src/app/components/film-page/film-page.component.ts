import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { IFilm, IFeedback } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FilmService } from 'src/app/services/film.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent{
  public film$: Observable<IFilm>;
  public user$: Observable<IUser | null>;

  public message: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private filmService: FilmService,
    private userService: UserService,
    private feedback: FeedbackService
  ) {
    const filmId$ = this.activatedRoute.params.pipe(map((params) => params['id']));

    this.film$ = filmId$.pipe(switchMap((id) => this.filmService.getFilmByID(id)));
    this.user$ = this.userService.currentUser$;
  }

  public showMessage() {
    this.message = "Зарегистрируйтесь или войдите в свой профиль";
  }

  public deleteMessage() {
    this.message = "";
  }

  public async onMovieRatingUpdate(film: IFilm, user: IUser, rat: number) {
    const newRating = Math.round((film.rating+rat) / 2);
    const feed = { ...film.feedback, userId: user.id, movieRating: rat }
    const newFilm = { ...film, rating: newRating, feedback: feed, viewing: true};
    const feedF = { ...film.feedback, userId: user.id, movieRating: rat, filmId: film.id }
    await firstValueFrom(this.filmService.updateFilm(newFilm));
    await firstValueFrom(this.feedback.updateFilmFeedback(film, user.id, feedF));
  }

  /*public async addToBlackList(film: IFilm) {
    const newFilm = { ...film, veto: !film.veto };
    await firstValueFrom(this.filmService.updateFilm(newFilm));
  }*/

}
