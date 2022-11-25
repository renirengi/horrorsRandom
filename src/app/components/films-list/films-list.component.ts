import { Component, Input, OnInit } from '@angular/core';
import { IFilm } from 'src/app/interfaces/film';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
 @Input() films!: IFilm[];
  constructor() { }

  ngOnInit(): void {
  }

}
