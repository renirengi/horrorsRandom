import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { IFeedback, IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-text-review',
  templateUrl: './user-text-review.component.html',
  styleUrls: ['./user-text-review.component.scss']
})
export class UserTextReviewComponent implements OnInit {
  @Input() get film(): IFilm {
    return this._film;
  }
  set film(val: IFilm) {
    this._film = val;
    this.getFeedList();
    this._textfeedbackList = this.getFeedbackList(this.feeds);
  }
  @Output() update = new EventEmitter<string>();

  public feeds$!: Observable<IFeedback[]>;
  public feeds!:IFeedback[];
  public user$: Observable<IUser | null>;
  private _film!: IFilm;
  public comment:string = '';
  public text!: IFeedback[];
  public _textfeedbackList!: Promise<{name: string, review: string, id: number, avatar?: string}[]>;


  constructor(
    private userService: UserService,
    private feedback:FeedbackService,
  ) {
    this.user$ = this.userService.currentUser$;

  }


  public async getFeedbackList(feedback: IFeedback[]) {

    console.log (this.feeds);
    if (feedback) {
      console.log(1);
      const feedbackWithText = feedback.filter(fb => !!fb.review);

      if (feedbackWithText.length > 0) {
        const userIds = feedbackWithText.map((fb => fb.userId));
        const users = await firstValueFrom(this.userService.getUsers(userIds));
        console.log (feedbackWithText.map((fb, index) => ({...users[index], review: fb.review!})));
        return feedbackWithText.map((fb, index) => ({...users[index], review: fb.review!}));
      }
    }

    return Promise.resolve([]);

  }

  public async getFeedList() {
    this.feeds= await firstValueFrom (this.feedback.getFilmFeedback(this.film.id));
    return this.feeds;
  }

  public onClick () {
    this.update.emit(this.comment);
  }


   ngOnInit() {

  }



}
