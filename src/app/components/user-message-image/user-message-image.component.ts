import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-message-image',
  templateUrl: './user-message-image.component.html',
  styleUrls: ['./user-message-image.component.scss']
})
export class UserMessageImageComponent implements OnInit {
  @Input() userId!: number;

  public user$!:Observable<IUser>;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(){
    this.user$ = this.userService.findUserById(this.userId);
  }

}
