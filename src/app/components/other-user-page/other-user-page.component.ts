import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-other-user-page',
  templateUrl: './other-user-page.component.html',
  styleUrls: ['./other-user-page.component.scss']
})
export class OtherUserPageComponent implements OnInit {
  public otherUser: boolean = true;
  public watchUser$: Observable<IUser>;
  public watchUser!: IUser;
  public currentUser$: Observable<IUser|null>;

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
  ) {
    const watchUserId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
    this.watchUser$ = watchUserId$.pipe(switchMap((id) => this.userService.findUserById(id))) as Observable<IUser>;
    this.currentUser$ = this.userService.currentUser$;
   }

  ngOnInit() {}

}
