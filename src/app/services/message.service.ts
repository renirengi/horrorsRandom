import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, of, shareReplay, tap } from 'rxjs';
import { IUser } from '../interfaces/user';
import { IMessages } from '../interfaces/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly baseUrl = 'http://localhost:3000/messages';

  constructor(
    private http: HttpClient,
  ) { }

  public getMessageByUserId(userId:number) {
    return this.http.get<IMessages[]>(`http://localhost:3000/messages?firstUserId=${userId}`).pipe(shareReplay(1));
  }

}
