import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-change-registration-modal',
  templateUrl: './change-registration-modal.component.html',
  styleUrls: ['./change-registration-modal.component.scss']
})
export class ChangeRegistrationModalComponent implements OnInit {
  public showConfirmation = true;
  public passwordInput: string = '';
  public passwordConfirmInput: string = '';

  public newRegInformationForm = new FormGroup({
    email: new FormControl('', [

      Validators.email
    ]),
    name: new FormControl('', [

      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),

  });

  get email() {
    return this.newRegInformationForm.controls.email as FormControl
  }

  get password() {
    return this.newRegInformationForm.controls.password as FormControl
  }

  get confirmPassword() {
    return this.newRegInformationForm.controls.confirmPassword as FormControl
  }

  get name() {
    return this.newRegInformationForm.controls.name as FormControl
  }
    constructor(
      public dialogRef: MatDialogRef<ChangeRegistrationModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { user: IUser },
    ) {
      this.applyFormValues(data.user);
     }

    onNoClick(): void {
      this.dialogRef.close();
    }

    private applyFormValues(user: IUser): void {
      this.newRegInformationForm.patchValue({
        name: user.name,
        email: user.email,
      });
    }


  ngOnInit(): void {
  }


}
