import { Component, Input, OnInit } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { IFeedback, IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-film-text-review',
  templateUrl: './film-text-review.component.html',
  styleUrls: ['./film-text-review.component.scss']
})
export class FilmTextReviewComponent implements OnInit {
  @Input()
  get user(): IUser {
    return this._user;
  }
  set user(val: IUser) {
    this._user = val;
    this._textfeedbackList = this.getFeedbackList();
  }

  private _user!: IUser;
  public feeds!:IFeedback[];
  public film$!: Observable<IFilm>;
  public comment:string = '';
  public _textfeedbackList!: Promise<{rusTitle: string, title: string, year: string, review: string, id: number, urlPoster: string, dateReview?: string, typeReview?: string, reviewState?:boolean|string}[]>;


  constructor(
    private filmService: FilmService,
    private feedback:FeedbackService,
  ) {

  }
  ngOnInit(): void {

  }


  public async getFeedbackList() {
    const feedback = await firstValueFrom(this.feedback.findFeedbackByUser(this._user.id));

   if (feedback) {
      let feedbackWithText = feedback.filter(fb => !!fb.review);
      feedbackWithText.sort((a, b) => a.filmId > b.filmId ? 1 : -1);

      if (feedbackWithText.length > 0) {
        const filmsIds = feedbackWithText.map((fb => fb.filmId));
        const films = await firstValueFrom(this.filmService.getFilms(filmsIds));
        return feedbackWithText.map((fb, index) => ({...films[index], review: fb.review!, dateReview: fb.dateReview, typeReview:fb.typeReview, reviewState:fb.reviewState }));
      }
    }

    return Promise.resolve([]);

  }
}
