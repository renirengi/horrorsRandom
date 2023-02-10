import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent implements OnInit {
  @Input() userId!:number;

  public user$!: Observable<IUser>

  constructor(
    public userService: UserService,
  ) {

   }

  ngOnInit(): void {
    this.user$ = this.userService.findUserById(this.userId);
  }

}
