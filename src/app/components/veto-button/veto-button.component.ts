import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-veto-button',
  templateUrl: './veto-button.component.html',
  styleUrls: ['./veto-button.component.scss']
})
export class VetoButtonComponent implements OnInit {
  @Input() user!: IUser;
  @Input() film!: IFilm;


  constructor(
    public userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  public inViewingList(id: number, user: IUser): boolean {
    return !user?.userFilms?.viewing?.includes(id);
  }

  public inVetoList(id: number, user: IUser): boolean {
    return !user?.userFilms?.veto?.includes(id);
  }

  public async addToBlackList(user: IUser, id: number) {
    const { userFilms } = user;
    userFilms?.veto?.push(id);
    await firstValueFrom(this.userService.updateUser({ ...user, userFilms: { ...userFilms } }));
  }

  public async deleteIntoBlackList (user:IUser, id:number) {
    const { userFilms } = user;
    const veto = userFilms!.veto?.filter((elem) => elem !== id);
      await firstValueFrom(this.userService.updateUser({ ...user, userFilms: {...userFilms, veto} }));
  }

}
