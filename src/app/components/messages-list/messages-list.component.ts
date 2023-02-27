import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageModalComponent } from '../new-message-modal/new-message-modal.component';
import { IMessage, IDialog } from 'src/app/interfaces/messages';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

interface MessageFormData {
  theme:string;
  secondUser: string;
  text: string;
}
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {
  @Input() user!: IUser;

  public messages$!: Observable<IDialog[]>;
  public delVisibility: boolean = false;
  public messIds:number[]=[];

  constructor(
    public dialog: MatDialog,
    public messageService:MessageService,
    public userService: UserService,
  ) { }

  ngOnInit(){
    this.messages$ = this.messageService.getMessageByUserId(this.user.id);
  }

  async onMessagesUpdate (mes:IDialog) {
   await firstValueFrom(this.messageService.addNewDialog(mes));
   this.messages$ = this.messageService.getMessageByUserId(this.user.id);
  }

  public addMessageToDelete(id:number) {
    if(!this.messIds.includes(id)){
    this.messIds.push(id);
  }
    console.log(this.messIds)
  }

   public async onDeleteMessages() {
    console.log(this.messIds)
   this.messIds.forEach(async (mes)=>
   await firstValueFrom(this.messageService.deleteDialog(mes))
  );
  this.messages$ = this.messageService.getMessageByUserId(this.user.id);
  }

  public onChangeFlag(flag:boolean) {
   this.delVisibility = flag;

  }

  async writeMessage (currentUser:IUser) {
    const govenmentModalConfig = { width: '60vw', data: {currentUser} };
    const dialogRef = this.dialog.open(NewMessageModalComponent, govenmentModalConfig);
    const result = await firstValueFrom(dialogRef.afterClosed()) as MessageFormData;
    const { theme, secondUser, text } = result;
    const secondUserId = await firstValueFrom(this.userService.findUsersByName(secondUser))
    let mes = [];
    mes.push({id:1, timestamp:new Date(), authorId:currentUser.id, text:text, statement:false});

    const newDialog= {id:0, firstUserId:currentUser.id, secondUserId:secondUserId[0].id, theme: theme, messages: mes} as IDialog;

    await firstValueFrom(this.messageService.addNewDialog(newDialog));
   this.messages$ = this.messageService.getMessageByUserId(this.user.id);
  }

}
