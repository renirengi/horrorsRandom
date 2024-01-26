import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFilm } from 'src/app/interfaces/film';
import { countries, genres, years } from 'src/assets/constants';

@Component({
  selector: 'app-fix-buffer-modal',
  templateUrl: './fix-buffer-modal.component.html',
  styleUrls: ['./fix-buffer-modal.component.scss']
})
export class FixBufferModalComponent implements OnInit {

public countries:string[] = countries;
public genres:string[] = genres;
public years:string[] = years;
public rating: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
public film!:IFilm;

public bufferFilmForm = new FormGroup({
  title: new FormControl('', [
    Validators.required
  ]),
  rusTitle: new FormControl(''),
  director: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30)
  ]),
  trailer: new FormControl(''),
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

  rating: new FormControl(),

});

  constructor(
    public dialogRef: MatDialogRef<FixBufferModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { film: IFilm },
  ) {
    this.applyFormValues(data.film);
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private applyFormValues(film: IFilm): void {
    this.bufferFilmForm.patchValue({
      title: film.title,
      rusTitle: film.rusTitle,
      trailer: film.trailer,
      year: film.year,
      director: film.director,
      urlPoster: film.urlPoster,
      countries: film.countries,
      genres: film.genres,
      plot: film.plot,
      url: film.url,
      notes: film.notes,
      rating: film.rating
    });
  }

  ngOnInit(): void {
  }

}
