import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom, map, Observable, startWith } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-message-modal',
  templateUrl: './new-message-modal.component.html',
  styleUrls: ['./new-message-modal.component.scss']
})
export class NewMessageModalComponent implements OnInit {
  public names$: Observable<string[]>;
  public names!:string[];
  options: string[] = ['One', 'Two', 'Three'];
  public filteredOptions$!: Observable<string[]>;

  public addMessageForm = new FormGroup({
    theme: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    secondUser: new FormControl(''),
    text: new FormControl('', [
      Validators.required
    ])

  });
  constructor(
    public dialogRef: MatDialogRef<NewMessageModalComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { currentUser: IUser },

  ) {
    this.names$ = this.userService.getAvailableUsersNames(data.currentUser.id);
   }

  async ngOnInit(){
    this.names = await lastValueFrom (this.names$);
    this.filteredOptions$ = this.addMessageForm.get('secondUser')!.valueChanges.pipe(
      startWith(''),
      map(value =>
        this._filter(value || '')),
    );
  }

  private  _filter(value: string ) {
    const filterValue = value.toLowerCase();

    return this.names.filter(option => option.toLowerCase().includes(filterValue));
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
