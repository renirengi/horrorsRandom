import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { IMessage, IMessages } from 'src/app/interfaces/messages';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { UserRatingComponent } from '../user-rating/user-rating.component';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss']
})
export class MessagePageComponent implements OnInit {
  public message$!:Observable<IMessages>;
  public message!: IMessages;

  public messageForm = new FormGroup({
    realName: new FormControl('')
  });

  constructor(
    private activatedRoute:ActivatedRoute,
    private messageService:MessageService,
    private userService: UserService,
  ) {
    const messageId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
    this.message$ = messageId$.pipe(switchMap((id) => this.messageService.getMessageById(id))) as Observable<IMessages>;
   }


  async ngOnInit() {
    this.message = await lastValueFrom(this.message$);
  }

}
