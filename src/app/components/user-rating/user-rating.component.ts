import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { IFeedback, IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
  @Input() userId!: number;
  @Input() filmId!: number;

  public feed!: IFeedback;


  constructor(
    private feedback:FeedbackService
  ) {

  }

  async ngOnInit() {
    this.feed = await firstValueFrom(this.feedback.findFeedbackItem(this.filmId, this.userId));
  }

}
