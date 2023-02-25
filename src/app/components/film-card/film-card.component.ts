import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  @Input() film!: IFilm;
  @Input() user!: IUser;

  public user$: Observable<IUser | null>;


  public message: string = "";


  constructor(
    private router: Router,
    private userService: UserService,
    private filmService: FilmService,
    private feedback: FeedbackService,
  ) {
    this.user$ = this.userService.currentUser$;
   }

  ngOnInit(){
  }

  public showMessage() {
    this.message = "Зарегистрируйтесь или войдите в свой профиль";
  }

  public onDeleteMessages() {
    this.message = "";
  }

  public inViewingList(id: number, user: IUser): boolean {
    return !!user?.userFilms?.viewing?.includes(id);
  }

  public inVetoList(id: number, user: IUser): boolean {
    return !!user?.userFilms?.veto?.includes(id);
  }
}
