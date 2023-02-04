import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { BufferService } from 'src/app/services/buffer.service';
import { FilmService } from 'src/app/services/film.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public newFilms$!: Observable<IFilm[]>;

  constructor(
    private buffer: BufferService
  ) {
    this.newFilms$ = this.buffer.getAllBufferFilms();
   }

  ngOnInit(): void {

  }

}
