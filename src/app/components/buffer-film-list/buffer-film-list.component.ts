import { Component, Input, OnInit } from '@angular/core';
import { IFilm } from 'src/app/interfaces/film';

@Component({
  selector: 'app-buffer-film-list',
  templateUrl: './buffer-film-list.component.html',
  styleUrls: ['./buffer-film-list.component.scss']
})
export class BufferFilmListComponent implements OnInit {
  @Input() films!: IFilm[]

  constructor() { }

  ngOnInit(): void {
  }

}
