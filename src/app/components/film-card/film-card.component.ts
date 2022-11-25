import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  @Input() film!: IFilm;

  public user$: Observable<IUser | null>;
  public message: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private filmService: FilmService,
    private feedback: FeedbackService,
  ) {
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

  public async onMovieRatingUpdate(film: IFilm, user: IUser, rat: number) {
    const newRating = Math.round((film.rating+rat) / 2);
    const feed = { ...film.feedback, userId: user.id, movieRating: rat }
    const newFilm = { ...film, rating: newRating, feedback: feed };
    const feedF = { ...film.feedback, userId: user.id, movieRating: rat, filmId: film.id }
    await firstValueFrom(this.filmService.updateFilm(newFilm));
    await firstValueFrom(this.feedback.updateFilmFeedback(film, user.id, feedF));
  }

}
