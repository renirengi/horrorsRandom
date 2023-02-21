import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, of, shareReplay, tap } from 'rxjs';
import { IUser } from '../interfaces/user';
import { IMessage, IDialog } from '../interfaces/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly baseUrl = 'http://localhost:3000/messages';

  constructor(
    private http: HttpClient,
  ) { }

  public getMessageByUserId(userId:number){

    return this.http.get<IDialog[]>(this.baseUrl).pipe(
      map((messages) => {
       return messages.filter((message) => message.firstUserId==userId || message.secondUserId==userId)
      }))
  }

  public getMessageById(id:number) {
    const url = `${this.baseUrl}/${String(id)}`;
    return this.http.get<IDialog>(url);
  }

  /*public findFeedbackItem(filmId: number, userId: number): Observable<IFeedback>  {
    return this.http.get<IFeedback[]>(`${this.baseUrl}?filmId=${filmId}&userId=${userId}`)
    .pipe(
      map(result => result[0])
    );
  }*/

  public addMessageItem(dialogId: number, userId: number, message: Partial<IMessage>) {
    return this.http.post<IMessage>(`${this.baseUrl}/${dialogId}`, {...message, userId});
  }

  public updateMessage(message: Partial<IMessage>) {
    return this.http.patch<IMessage>(`${this.baseUrl}/${message.id}`, message);
  }

  /*public updateMessageFeedback(message: IMessage, userId: number, feedback: Partial<IMessage>): Observable<IMessage> {

    return this.findFeedbackItem(film.id, userId)
    .pipe(
      switchMap((fb) => {
        return fb ? this.updateFeedbackItem(fb.id, feedback) : this.addFeedbackItem(film.id, userId, feedback);
      })
    );
  }*/

}
