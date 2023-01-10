import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-users-review-counts',
  templateUrl: './users-review-counts.component.html',
  styleUrls: ['./users-review-counts.component.scss']
})
export class UsersReviewCountsComponent implements OnInit {
  @Input() userId!: number;

  public reviewCounts!:number;
  public marksCounts!:number;

  constructor(
    public feedback: FeedbackService
  ) { }

   async ngOnInit() {
    const feedback = await firstValueFrom(this.feedback.findFeedbackByUser(this.userId));
    this.reviewCounts = feedback.filter(fb => !!fb.review).length;
    this.marksCounts = feedback.filter(fb => !!fb.movieRating).length;
    console.log (this.reviewCounts, this.marksCounts)
  }

}
