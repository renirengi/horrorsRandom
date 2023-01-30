import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  public showConfirmation = true;
  public passwordInput: string = '';
  public passwordConfirmInput: string = '';
  public baseAvatar = "https://www.meme-arsenal.com/memes/6bd0fe45e3ddadd122fd2aa9b626e56b.jpg";

  public registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    name: new FormControl('', [
      Validators.required,
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

  constructor(
    public dialogRef: MatDialogRef<RegisterModalComponent>,
    private userService: UserService
  ) { }

  get email() {
    return this.registerForm.controls.email as FormControl
  }

  get password() {
    return this.registerForm.controls.password as FormControl
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword as FormControl
  }

  get name() {
    return this.registerForm.controls.name as FormControl
  }

  async onSubmit () {

    const id = 0;
    const email = this.registerForm.value['email'] as string;
    const name = this.registerForm.value['name'] as string;
    const password = this.registerForm.value['password'] as string;
    const user = {id, email, name, password};

    await firstValueFrom(this.userService.addUser({
      ...user,
      personalData: {},
      rules: "user",
      userFilms: {
        veto: [],
        viewing: []
      }
    }));
    this.dialogRef.close();
  }

  onNoClick ():void {
    this.dialogRef.close();
  }



  ngOnInit(): void {
  }


}
