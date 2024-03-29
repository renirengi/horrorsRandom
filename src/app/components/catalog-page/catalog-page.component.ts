import { Component, OnInit } from '@angular/core';
import { firstValueFrom, lastValueFrom, map, Observable, switchMap } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { AddFilmModalComponent } from '../add-film-modal/add-film-modal.component';

import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BufferService } from 'src/app/services/buffer.service';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  public films$!: Observable<IFilm[]>;

  public films!: IFilm[];
  public user$: Observable<IUser | null>;
  private readonly govenmentModalConfig = { width: '70vw', data: {} };

  constructor(
    private filmService: FilmService,
    private userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private buffer: BufferService
  ) {
    this.user$ = this.userService.currentUser$;
    this.films$ = this.route.queryParams.pipe(
      switchMap(queryParams => this.filmService.getFilteredFilms(queryParams))
    );
   }

  async ngOnInit() {
    this.films = await lastValueFrom(this.films$);

  }

  async showGovenment (user:IUser){
    const dateAdd = new Date().toDateString();
    const dialogRef = this.dialog.open(AddFilmModalComponent, this.govenmentModalConfig);
    const result: {title:string, rusTitle:string, director:string, trailer:string, year:string, rating:number, urlPoster:string, countries:string[], genres:string[], plot:string, url: string, notes: string} = await firstValueFrom(dialogRef.afterClosed());
    const {title, rusTitle, director, trailer, year, rating, urlPoster, countries, genres, plot, url, notes} = result;
    const newFilm = {id:0, userId:user.id, title, rusTitle, director, trailer, year, rating, urlPoster, countries, genres, plot, url, notes, filmDate: dateAdd};

    await firstValueFrom(this.buffer.addBufferFilm(newFilm));
  }

}
