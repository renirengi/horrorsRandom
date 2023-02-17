import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage, IMessages } from 'src/app/interfaces/messages';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {
  @Input() user!: IUser;

  public messages$!: Observable<IMessages[]>;

  constructor(
    private message:MessageService
  ) { }

  ngOnInit(){
    this.messages$ = this.message.getMessageByUserId(this.user.id);
  }

}
