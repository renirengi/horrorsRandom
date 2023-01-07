import { Component, Inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user';

import { allCountries } from 'src/assets/constants';

@Component({
  selector: 'app-user-information-modal',
  templateUrl: './user-information-modal.component.html',
  styleUrls: ['./user-information-modal.component.scss']
})
export class UserInformationModalComponent implements OnInit {

  public countries:string[] = allCountries;

  public informationForm = new FormGroup({
    realName: new FormControl(''),
    avatar: new FormControl(''),
    country:  new FormControl(''),
    socialLink1: new FormControl(''),
    userAbout: new FormControl(''),
    birthday: new FormControl(''),
    phone: new FormControl('', [Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{9}$/)]),

  });
    constructor(
      public dialogRef: MatDialogRef<UserInformationModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { user: IUser },
    ) {
      this.applyFormValues(data.user);
     }

    onNoClick(): void {
      this.dialogRef.close();
    }

    private applyFormValues(user: IUser): void {
      this.informationForm.patchValue({
        avatar: user.avatar,
        userAbout: user.personalData?.about,
        country: user.personalData?.country,
        ///birthday: user.personalData?.birthday,//// mistake is here
        realName: user.personalData?.realName,
        socialLink1: user.personalData?.link,
        phone: user.personalData?.phone,
      });
    }


  ngOnInit(): void {
  }

}
