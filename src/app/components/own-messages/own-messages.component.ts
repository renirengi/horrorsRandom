import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IMessages } from 'src/app/interfaces/messages';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-own-messages',
  templateUrl: './own-messages.component.html',
  styleUrls: ['./own-messages.component.scss']
})
export class OwnMessagesComponent implements OnInit {

  public user$: Observable<IUser | null>;
  public messages$!: Observable<IMessages[]>
  constructor(
    private userService: UserService
  ) {
    this.user$ = this.userService.currentUser$;
  }

  ngOnInit(){
  }

}
