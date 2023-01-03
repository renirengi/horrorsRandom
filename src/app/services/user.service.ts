import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, of, tap } from 'rxjs';

import { IUser } from '../interfaces/user';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly cookieName = 'curUsr';

  private _currentUser$ = new BehaviorSubject<IUser|null>(null);

  get currentUser$(): BehaviorSubject<IUser|null> {
    return this._currentUser$;
  }

  private readonly baseUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private cookies: CookieService) {
      this.restoreUser();
     }

     public getUser(id: number): Observable<IUser> {
      const url = `${this.baseUrl}/${id.toString()}`;

      return this.http.get<IUser>(url);
    }

    public addUser(user: IUser): any {
      const url = `${this.baseUrl}`;
      const password = user.password;

      return this.http.post<IUser>(url, {...user, password});
    }

    public findUsersByName(name: string): Observable<IUser[]> {
      return this.http.get<IUser[]>(`${this.baseUrl}?name=${name}`);
    }

    public updateUser(user: IUser) {
      const url = `${this.baseUrl}/${user.id}`;

      return this.http.patch<IUser>(url, user).pipe(
        tap((user)=> this._currentUser$.next(user))
      );
    }

    public loginUser(name: string, password: string): Observable<IUser|null> {
      if (name === '' || password === '') {
        return of(null);
      }

      return this.findUsersByName(name).pipe(
        map(([user]) => user?.password === password? user : null),
        tap((user) => user && this.onUserUpdate(user))
      );
    }

    public getUsers(userIds: number[]): Observable<Pick<IUser, 'id'|'name'|'avatar'>[]> {
      const paramsStr = userIds.map(id => `id=${id}`).join('&');

      return this.http.get<IUser[]>(`${this.baseUrl}?${paramsStr}`).pipe(
        map((users) => users.map(({id, name, avatar}) => ({id, name, avatar})))
      );
    }

    public logOutUser(): void {
      this.onUserUpdate(null);
    }

    public onUserUpdate(user: IUser | null): void {
      if (user) {
        const sameSite = 'strict';
        const expires = this.cookies.getExpiritonDate(1);

        this.cookies.setCookie(this.cookieName, user.id.toString(), { expires, sameSite })
      } else {
        this.cookies.deleteCookie(this.cookieName)
      }

      this._currentUser$.next(user)
    }

    private async restoreUser() {
      const userID = this.cookies.getCookie(this.cookieName);

      if (userID) {
        const currentUser = await firstValueFrom(this.getUser(+userID));

        this.currentUser$.next(currentUser);
      }
    }
    public getAllUsers(): Observable<IUser>{
      return this.http.get<IUser>(this.baseUrl);
    }

}
