import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';
import { BufferService } from 'src/app/services/buffer.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public user!: IUser;
  public newFilms$!: Observable<IFilm[]>
  public activePage: 'film' | 'review'='film';
  public _textfeedbackList!: Promise<{userId: number, rusTitle: string, title: string, year: string, review: string, id: number, urlPoster: string, dateReview?: string, typeReview?: string, reviewState?:boolean|string}[]>;

  constructor(

    private buffer: BufferService,
    private feedback: FeedbackService,
    private filmService: FilmService,
    private userService: UserService,
    private router: Router
  ) {

   }

  ngOnInit() {
    this.newFilms$= this.buffer.getAllBufferFilms();
    this._textfeedbackList= this.getFeedbackList();
  }


  public async getFeedbackList() {
    let feedback = await firstValueFrom(this.feedback.getFilmFeedbackWithParam(undefined,"wait"));

   if (feedback) {
      let feedbackWithText = feedback.filter(fb => !!fb.review);
      feedbackWithText.sort((a, b) => a.filmId > b.filmId ? 1 : -1);

      if (feedbackWithText.length > 0) {
        const filmsIds = feedbackWithText.map((fb => fb.filmId));
        const films = await firstValueFrom(this.filmService.getFilms(filmsIds));
        return feedbackWithText.map((fb, index) => ({...films[index], userId:fb.userId, review: fb.review!, dateReview: fb.dateReview, typeReview:fb.typeReview, reviewState:fb.reviewState }));
      }
    }

    return Promise.resolve([]);

  }

  public async updateFeed(filmId:number, userId:number, flag: string) {
    const film = await firstValueFrom(this.filmService.getFilmByID(filmId));

    await lastValueFrom(this.filmService.updateFilmFeedback(film, userId, {  reviewState:`${flag}` }).pipe(first()));
    ///this.router.navigate(["/user"]);
    this._textfeedbackList= this.getFeedbackList();
  }

}


