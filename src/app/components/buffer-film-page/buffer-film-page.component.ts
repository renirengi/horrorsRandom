import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { BufferService } from 'src/app/services/buffer.service';
import { FilmService } from 'src/app/services/film.service';
import { FixBufferModalComponent } from '../fix-buffer-modal/fix-buffer-modal.component';

@Component({
  selector: 'app-buffer-film-page',
  templateUrl: './buffer-film-page.component.html',
  styleUrls: ['./buffer-film-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BufferFilmPageComponent implements OnInit {
  public film$!: Observable<IFilm>;
  public user$!: Observable<IUser>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private buffer:BufferService,
    private filmService: FilmService,
    public dialog: MatDialog,
  ) {
    const filmId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
    this.film$ = filmId$.pipe(switchMap((id) => this.buffer.getBufferFilmByID(id))) as Observable<IFilm>;
   }

   ngOnInit(){
  }

  public async pushIntoBase(film:IFilm) {
    const newFilm = {id:0, userId:film.userId, title:film.title, rusTitle:film.rusTitle, director:film.director, trailer:film.trailer, year:film.year, rating:film.rating, urlPoster:film.urlPoster, countries:film.countries, genres:film.genres, plot:film.plot, url:film.url, notes:film.notes, filmDate:film.filmDate};
    await firstValueFrom(this.filmService.addFilm(newFilm));
    this.deleteFilm(film);
    this.router.navigate(["/admin"]);
  }

  public async deleteFilm(film:IFilm) {
    await  firstValueFrom(this.buffer.deleteBufferFilmByID(film.id));
    this.router.navigate(["/admin"]);
  }

  public async fixFilm(film:IFilm) {
    const modalConfig = { width: '60vw', data: { film } };
    const dialogRef = this.dialog.open(FixBufferModalComponent, modalConfig);

    const result = (await firstValueFrom(dialogRef.afterClosed())) as IFilm;

    if (result) {
      await firstValueFrom(this.buffer.updateBufferFilm(this.getUpdatedBuffer(film,result)));
    }

    this.router.navigate([`/admin`]);
  }

  public getUpdatedBuffer(film: IFilm, result:IFilm): IFilm {
    const { title, rusTitle, trailer, year, director, urlPoster, countries, genres, plot, url, notes, rating} = result;

    return { ...film, title, rusTitle, trailer, year, director, urlPoster, countries, genres, plot, url, notes, rating };
  }



}
