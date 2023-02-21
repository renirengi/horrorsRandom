import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, firstValueFrom, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { IMessage, IDialog } from 'src/app/interfaces/messages';
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
  public dialog$!:Observable<IDialog>;
  public user$:BehaviorSubject<IUser | null>;
  public messageId$!: Observable<number>;
  public messageForm = new FormGroup({
    textMes: new FormControl('')
  });

  constructor(
    private activatedRoute:ActivatedRoute,
    private messageService:MessageService,
    private userService: UserService,
  ) {
    const messageId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
    this.dialog$ = messageId$.pipe(switchMap((id) => this.messageService.getMessageById(id))) as Observable<IDialog>;
    this.user$ = this.userService.currentUser$;
   }


  ngOnInit() {
  }

  public async sendMessage(userId:number, dialog:IDialog) {
    let newDialog:IDialog = { firstUserId: dialog.firstUserId, secondUserId: dialog.secondUserId, id: dialog.id, theme: dialog.theme, messages: dialog.messages}
    const now = new Date();
    const oldMes:IMessage = {id:dialog.messages.length, authorId:dialog.messages[dialog.messages.length-1].authorId, text: dialog.messages[dialog.messages.length-1].text, timestamp: dialog.messages[dialog.messages.length-1].timestamp, statement:true};

    const newMes ={id:dialog.messages.length+1, authorId:userId, text: this.messageForm.value['textMes'], timestamp: now, statement:false} as IMessage;
    newDialog.messages?.splice(dialog.messages.length-1, 1, oldMes);
    newDialog.messages?.push(newMes);
    this.messageForm.patchValue({textMes:''})
    await firstValueFrom(this.messageService.updateMessage({ ...dialog }));
  }

  public async changeStatement (id:number) {

  }

}
