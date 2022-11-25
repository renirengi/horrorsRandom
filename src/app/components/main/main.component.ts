import { Component, OnInit } from '@angular/core';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { IFilm } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services/film.service';
 import { SettingModalComponent } from '../setting-modal/setting-modal.component';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public films!: IFilm[];
  public randomFilm!: IFilm;
  public user$: Observable<IUser | null>;
  public tags$: Observable<string[]>;
  private readonly mainModalConfig = { width: '30vw', data: {} };

  constructor(
    private filmService: FilmService,
    public dialog: MatDialog,
    public userService: UserService
  ) {
    this.tags$ = this.filmService.getAvailable('genres');
    this.user$ = this.userService.currentUser$;
   }

  async ngOnInit() {
    this.films = await lastValueFrom(this.filmService.getAllFilms());
  }

  public async showSettings() {
    const dialogRef = this.dialog.open(SettingModalComponent, this.mainModalConfig);
    const result = await firstValueFrom(dialogRef.afterClosed());
    /*const param = result.tag.concat().toString().replace(/,/g, '&');
    this.films = await lastValueFrom(this.filmService.findFilmsByParams(param));*/
  }


  public async generateRandomFilmWithoutViwing(user:IUser) {
    ///this.films = await lastValueFrom(this.filmService.getFilmWithoutRating(user));
    this.filmService.getFilmWithoutRating(user);
    ////console.log(this.films)
    ///let rand = Math.floor(Math.random() * this.films.length);
    //this.randomFilm = this.films[rand];
  }

  public generateRandomFilm () {

  }

}
