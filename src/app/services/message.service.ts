import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, of, shareReplay, tap } from 'rxjs';
import { IUser } from '../interfaces/user';
import { IMessage, IMessages } from '../interfaces/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly baseUrl = 'http://localhost:3000/messages';

  constructor(
    private http: HttpClient,
  ) { }

  public getMessageByUserId(userId:number){

    return this.http.get<IMessages[]>(this.baseUrl).pipe(
      map((messages) => {
       return messages.filter((message) => message.firstUserId==userId || message.secondUserId==userId)
      }))
  }

  public getMessageById(id:number) {
    const url = `${this.baseUrl}/${String(id)}`;
    return this.http.get<IMessages>(url);
  }

}
