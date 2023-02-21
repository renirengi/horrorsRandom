import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage, IDialog } from 'src/app/interfaces/messages';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})
export class MessageCardComponent implements OnInit {
  @Input() currentUser!:IUser;
  @Input() message!:IDialog;

  public userF$!: Observable<IUser>;
  public userS$!: Observable<IUser>;
  public identification:boolean=true;
  constructor(
    private userService: UserService,
  ) {

   }

  ngOnInit() {
    this.userF$ = this.userService.findUserById(this.message.firstUserId);
    this.userS$ = this.userService.findUserById(this.message.secondUserId);

    this.message.messages.forEach((mes)=>{
      if(mes.statement==false){
        this.identification=false;
      }
    })
  }


}
