import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
 @Input() films!: IFilm[];

 public currentFilms!: IFilm[];
 public previousFilms!: IFilm[];
 public nextFilms!: IFilm[];

  constructor() {}

  ngOnInit(): void {

    /*this.currentFilms = this.films.splice(0,6);
    console.log (this.currentFilms, this.previousFilms);*/

  }

}
