import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { IFeedback, IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-veto-collection',
  templateUrl: './veto-collection.component.html',
  styleUrls: ['./veto-collection.component.scss']
})
export class VetoCollectionComponent implements OnInit {
  @Input() @Input()
  get user(): IUser {
    return this._user;
  }

  private _user!: IUser;
  public films$!: Observable<IFilm[]>;

  constructor(
    public filmService: FilmService,
    public feedback: FeedbackService,
  ) { }


  set user(user: IUser) {
    this._user = user;
    const vetoFilmsIds = user.userFilms?.veto|| [];

    this.films$ = forkJoin(vetoFilmsIds.map((id: number) => this.filmService.getFilmByID(id))) as Observable<IFilm[]>;
  }

  ngOnInit(): void {
  }

}
