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

  public addMessageItem(dialogId: number, userId: number, message: Partial<IMessage>) {
    return this.http.post<IMessage>(`${this.baseUrl}/${dialogId}`, {...message, userId});
  }

  public addNewDialog(dialog: IDialog) {
    const url = `${this.baseUrl}`;

    return this.http.post<IDialog>(url, {...dialog});
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
