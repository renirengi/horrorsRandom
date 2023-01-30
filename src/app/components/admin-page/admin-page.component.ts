import { Component, OnInit } from '@angular/core';
import { IFilm } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services/film.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public newFilms!: IFilm[];

  constructor(
    private filmService:FilmService
  ) {

   }

  ngOnInit(): void {
    //this.newFilms = this.filmService.newFilm;

  }

}
