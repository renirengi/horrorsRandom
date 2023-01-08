import { Component, Input, OnInit } from '@angular/core';
import { Observable, forkJoin, firstValueFrom, lastValueFrom } from 'rxjs';
import { IFeedback, IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-viewing-collection',
  templateUrl: './viewing-collection.component.html',
  styleUrls: ['./viewing-collection.component.scss']
})
export class ViewingCollectionComponent implements OnInit {
  @Input()
  get user(): IUser {
    return this._user;
  }

  private _user!: IUser;
  public films$!: Observable<IFilm[]>;
  public feed!: IFeedback;
  public visibility: boolean = false;

  constructor(
    public filmService: FilmService,
    public feedback: FeedbackService,
  ) { }


  set user(user: IUser) {
    this._user = user;
    const ownedFilmsIds = user.userFilms?.viewing|| [];

    this.films$ = forkJoin(ownedFilmsIds.map((id: number) => this.filmService.getFilmByID(id))) as Observable<IFilm[]>;
  }



  ngOnInit(): void {
  }

}



