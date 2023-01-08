import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { UserInformationModalComponent } from '../user-information-modal/user-information-modal.component';
import { ChangeRegistrationModalComponent } from '../change-registration-modal/change-registration-modal.component';

interface UserFormData {
  avatar: string;
  realName: string;
  country: string;
  phone: string;
  about: string;
  link: string;
}

interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public user$: Observable<IUser | null>;
  public activePage: 'score' | 'veto' = 'score';

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {
    this.user$ = this.userService.currentUser$;
  }

  ngOnInit(): void {
  }

  public async showInformationModal(user: IUser) {
    const modalConfig = { width: '60vw', data: { user } };
    const dialogRef = this.dialog.open(UserInformationModalComponent, modalConfig);
    const result = (await firstValueFrom(dialogRef.afterClosed())) as UserFormData;

    if (result) {
      await firstValueFrom(this.userService.updateUser(this.getUpdatedUser(user, result)));
    }
  }

  public async showRegistrationInformationModal(user: IUser) {
    const modalConfig = { width: '60vw', data: { user } };
    const dialogRef = this.dialog.open(ChangeRegistrationModalComponent, modalConfig);
    const result = (await firstValueFrom(dialogRef.afterClosed())) as UserRegistrationData;
    const { name, email, password } = result;

    await firstValueFrom(this.userService.updateUser({ ...user, name, email, password }));
  }

  public getUpdatedUser(user: IUser, userFormValues: UserFormData): IUser {
    const { avatar, realName, country, phone, about, link } = userFormValues;
    const personalData = { ...user.personalData, realName, country, phone, about, link };

    return { ...user, personalData, avatar };
  }

}
