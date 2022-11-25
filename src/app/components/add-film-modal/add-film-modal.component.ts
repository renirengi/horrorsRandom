import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services/film.service';
import { countries, genres, years } from 'src/assets/constants';


@Component({
  selector: 'app-add-film-modal',
  templateUrl: './add-film-modal.component.html',
  styleUrls: ['./add-film-modal.component.scss']
})
export class AddFilmModalComponent {

public countries:string[] = countries;
public genres:string[] = genres;
public years:string[] = years;
public rating: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
public film!:IFilm;

public addFilmForm = new FormGroup({
  title: new FormControl('', [
    Validators.required
  ]),
  rusTitle: new FormControl('', [
    Validators.required
  ]),
  director: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30)
  ]),
  trailer: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50)
  ]),
  year:  new FormControl('', []),
  urlPoster: new FormControl(''),
  countries: new FormControl([''], [
  ]),
  genres: new FormControl([''], [

  ]),
  plot: new FormControl(''),
  url: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(100)
  ]),
  notes: new FormControl(''),

  rating: new FormControl('', [
   ]),

});
  constructor(
    public dialogRef: MatDialogRef<AddFilmModalComponent>,
    private filmService:FilmService,
    @Inject(MAT_DIALOG_DATA) public data: { film: IFilm },
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
