import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, firstValueFrom, map, Observable, switchMap } from 'rxjs';
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
export class FilmPageComponent implements OnInit{
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
  ngOnInit(): void {

  }

  public inViewingList(id: number, user: IUser): boolean {
    return !user?.userFilms?.viewing?.includes(id);
  }

  public inVetoList(id: number, user: IUser): boolean {
    return !user?.userFilms?.veto?.includes(id);
  }

  public showMessage() {
    this.message = "Зарегистрируйтесь или войдите в свой профиль";
  }

  public deleteMessage() {
    this.message = "";
  }

  public getStarRatingFromFilm(film: IFilm): number {
    let movieRating = film.feedback?.map((feedback) => feedback.movieRating).filter((val) => !!val) || [];
    movieRating.push(film.rating);
    const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    return Math.round(average(movieRating as number[]));
  }

  public async onMovieRatingUpdate(film: IFilm, user: IUser, movieRating: number) {

    this.film$ = this.filmService.updateFilmFeedback(film, user.id, { movieRating }).pipe(first());


  }

  public async addToBlackList(user: IUser, id: number) {
    let veto:number[];
    if (user.userFilms?.veto) {
      veto = user.userFilms?.veto;
    }
    else {
      veto = [];
    }
    veto?.push(id);
    await firstValueFrom(this.userService.updateUser({ ...user, userFilms: { veto } }))
  }

  public async deleteIntoBlackList (user:IUser, id:number) {
    let veto:number[];
    if (user.userFilms?.veto) {
      veto = user.userFilms?.veto;
      let index = veto.indexOf(id);
      veto.splice(index, 1);
      await firstValueFrom(this.userService.updateUser({ ...user, userFilms: { veto } }));
    }

  }

}
