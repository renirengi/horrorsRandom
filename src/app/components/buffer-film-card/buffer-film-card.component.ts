import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  user$!:Observable<IUser>;


  constructor (
    private userService: UserService,
  ) {

   }

  async ngOnInit() {
    this.user$ = this.userService.findUserById(Number(this.film.userId));

  }

}
