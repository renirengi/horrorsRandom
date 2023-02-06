import { Component, Input, OnInit } from '@angular/core';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buffer-film-card',
  templateUrl: './buffer-film-card.component.html',
  styleUrls: ['./buffer-film-card.component.scss']
})
export class BufferFilmCardComponent implements OnInit {
  @Input() film!: IFilm;
  user!:IUser;

  constructor (
  ) {

   }

  ngOnInit() {

  }

}
