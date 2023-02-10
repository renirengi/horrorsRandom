import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, firstValueFrom, lastValueFrom, map, Observable, switchMap } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { IFilm, IFeedback } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';
import { AddReviewModalComponent } from '../add-review-modal/add-review-modal.component';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit{
  public film$: Observable<IFilm>;
  public user$: Observable<IUser | null>;
  public feed!: IFeedback

  public message: string = "";
  public visibility: boolean = true;
  private readonly reviewModalConfig = { width: '70vw', data: {} };

  constructor(
    private activatedRoute: ActivatedRoute,
    private filmService: FilmService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    const filmId$ = this.activatedRoute.params.pipe(map((params) => params['id']));

    this.film$ = filmId$.pipe(switchMap((id) => this.filmService.getFilmByID(id)));
    this.user$ = this.userService.currentUser$;
  }
  ngOnInit(): void {

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
    const dateRating = new Date().toDateString();
    this.film$ = this.filmService.updateFilmFeedback(film, user.id, { movieRating, dateRating }).pipe(first());

    const { userFilms } = user;
    if (!user.userFilms?.viewing?.includes(film.id)){
      userFilms?.viewing?.push(film.id);
      console.log (userFilms)
    }

    await firstValueFrom(this.userService.updateUser({ ...user, userFilms: { ...userFilms } }));

  }


  public async showReviewForm(film: IFilm, user: IUser) {
    const dateReview = new Date().toDateString();
    const dialogRef = this.dialog.open(AddReviewModalComponent, this.reviewModalConfig);
    const result: {typeReview:string, review:string } = await firstValueFrom(dialogRef.afterClosed());
    const { review, typeReview } = result;

    this.film$ = this.filmService.updateFilmFeedback(film, user.id, { review, dateReview, typeReview, reviewState:"wait" }).pipe(first());

    const { userFilms } = user;
    if (!userFilms?.viewing?.includes(film.id)){
      userFilms?.viewing?.push(film.id);
    }

    await firstValueFrom(this.userService.updateUser({ ...user, userFilms: { ...userFilms } }));

  }

  public onChange (name:string, values:string) {
    this.router.navigate(['/catalog'], { queryParams: { [name]: values }});
  }

}
