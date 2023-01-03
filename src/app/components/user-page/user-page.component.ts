import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { UserInformationModalComponent } from '../user-information-modal/user-information-modal.component';

interface UserFormData {
  avatar: string;
  realName: string;
  country: string;
  birthday: string;
  about: string;
  link: string[];
}
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public user$: Observable<IUser | null>;
  private readonly userModalConfig = { width: '60vw', data: {} };

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {
    this.user$= this.userService.currentUser$;
   }

  ngOnInit(): void {
  }

  public async showInformationModal() {
    const dialogRef = this.dialog.open(UserInformationModalComponent, this.userModalConfig);
    const result = (await firstValueFrom(dialogRef.afterClosed())) as UserFormData;
    console.log (result);
  }

}
