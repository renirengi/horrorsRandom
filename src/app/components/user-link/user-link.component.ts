import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent implements OnInit {
  @Input() userId!:number;
  @Input() filmId!:number;

  public user$!: Observable<IUser>;
  public film$!: Observable<IFilm>;

  constructor(
    public userService: UserService,
    public filmService: FilmService
  ) {

   }

  ngOnInit(): void {
    this.user$ = this.userService.findUserById(this.userId);
    this.film$ = this.filmService.getFilmByID(this.filmId);
  }

}
