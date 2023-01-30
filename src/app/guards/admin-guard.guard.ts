import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  public user$: Observable<IUser | null>;

  constructor(
    public userService: UserService
  ) {
    this.user$ = this.userService.currentUser$;
   }

  async getUser(): Promise<boolean> {
    const user = await firstValueFrom(this.user$);
    if (user?.rules==="admin") {
      return true;
    }
    else {
      return false;
    }
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getUser();
  }

}
