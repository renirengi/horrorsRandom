import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeedback } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
  @Input() filmId!: number;
  @Input() userId!: number;

  public feed$!: Observable<IFeedback>

  constructor(
    private feedback:FeedbackService
  ) {
    this.feed$ = this.feedback.findFeedbackItem(this.filmId, this.userId);
  }

  ngOnInit(): void {

  }

}
