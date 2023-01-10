import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IFeedback } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-add-review-modal',
  templateUrl: './add-review-modal.component.html',
  styleUrls: ['./add-review-modal.component.scss']
})
export class AddReviewModalComponent {
  public feed!: IFeedback;
  public types = ["good", "neutral", "bad"];

  public addReviewForm = new FormGroup({
    typeReview:  new FormControl('', []),
    review: new FormControl(''),

  });
    constructor(
      public dialogRef: MatDialogRef<AddReviewModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {feed:IFeedback},
    ) { }

    onNoClick(): void {
      this.dialogRef.close();
    }


}
