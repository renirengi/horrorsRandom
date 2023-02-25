import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() change = new EventEmitter<number>();
  @Output() delete = new EventEmitter<boolean>();

  public userF$!: Observable<IUser>;
  public userS$!: Observable<IUser>;
  public identification:boolean=true;
  public delVisibility: boolean = false;

  constructor(
    private router: Router,
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

  public onCheckBoxChange(id:number) {
   return this.change.emit(id);
  }

  public changeBoolean() {
    console.log("Я меняю флаг");
    this.delVisibility=!this.delVisibility
    return this.delete.emit(this.delVisibility);
  }

  public goToMessage(id:number) {
    this.router.navigate([`/message/${id}`]);
  }


}
