import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

const userLoggedIn = 'You are logged in!';
const loginFailed = 'Wrong email or password!'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  public showConfirmation = true;
  public result$?: Observable<string>;

  public loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16)
    ]),
    });

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    const name = this.loginForm.value['name'] as string;
    const password = this.loginForm.value['password'] as string;

    this.result$ = this.userService.loginUser(name, password).pipe(
      map((result) => result ? userLoggedIn : loginFailed),
      tap((result) => {
        result && this.dialogRef.close()
      }))
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
