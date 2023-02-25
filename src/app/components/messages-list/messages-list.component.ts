import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { IMessage, IDialog } from 'src/app/interfaces/messages';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';

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
    private message:MessageService
  ) { }

  ngOnInit(){
    this.messages$ = this.message.getMessageByUserId(this.user.id);
  }

  async onMessagesUpdate (mes:IDialog) {
   await firstValueFrom(this.message.addNewDialog(mes));
   this.messages$ = this.message.getMessageByUserId(this.user.id);
  }

  public addMessageToDelete(id:number) {
    this.messIds.push(id);
  }

   public async onDeleteMessages() {
   this.messIds.forEach(async (mes)=>
   await firstValueFrom(this.message.deleteDialog(mes))
  );
  this.messages$ = this.message.getMessageByUserId(this.user.id);
  }

  public onChangeFlag(flag:boolean) {
    console.log(this.delVisibility)
   this.delVisibility = flag;

  }

}
