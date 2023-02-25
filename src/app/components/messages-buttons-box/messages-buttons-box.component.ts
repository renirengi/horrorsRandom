import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageModalComponent } from '../new-message-modal/new-message-modal.component';
import { IDialog } from 'src/app/interfaces/messages';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

interface MessageFormData {
  theme:string;
  secondUser: string;
  text: string;
}

@Component({
  selector: 'app-messages-buttons-box',
  templateUrl: './messages-buttons-box.component.html',
  styleUrls: ['./messages-buttons-box.component.scss']
})
export class MessagesButtonsBoxComponent implements OnInit {
  @Input() currentUser!: IUser
  @Output() update = new EventEmitter<IDialog>();

  public deleteMesVisibility: boolean = false;

  constructor(
    public dialog: MatDialog,
    public messageService:MessageService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  async writeMessage (currentUser:IUser) {
    const govenmentModalConfig = { width: '60vw', data: {currentUser} };
    const dialogRef = this.dialog.open(NewMessageModalComponent, govenmentModalConfig);
    const result = await firstValueFrom(dialogRef.afterClosed()) as MessageFormData;
    const { theme, secondUser, text } = result;
    const secondUserId = await firstValueFrom(this.userService.findUsersByName(secondUser))
    let mes = [];
    mes.push({id:0, timestamp:new Date(), authorId:currentUser.id, text:text, statement:false});

    const newDialog= {id:0, firstUserId:currentUser.id, secondUserId:secondUserId[0].id, theme: theme, messages: mes} as IDialog;

    return this.update.emit(newDialog);
  }

}
