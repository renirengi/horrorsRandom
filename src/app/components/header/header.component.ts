import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

import { IUser } from 'src/app/interfaces/user';
import { FilmService } from 'src/app/services/film.service';
import { UserService } from 'src/app/services/user.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;
  private readonly headerModalConfig = { width: '30vw', data: {} };
  public currentUser$!: BehaviorSubject<IUser | null>;

  public searchString: string = '';
  public filmsSearchString$: BehaviorSubject<string>;
  public change:boolean=false;
  public url: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private filmService: FilmService,
    public dialog: MatDialog
  ) {
    this.currentUser$ = this.userService.currentUser$;
    this.filmsSearchString$ = this.filmService.filmsSearchString$;
  }

  ngOnInit(): void {
  }

  public onLogout() {
    this.userService.logOutUser();
  }

  public showLoginModal() {
    this.dialog.open(LoginModalComponent, this.headerModalConfig);
  }

  public goToCatalogPage() {
    this.router.navigate(['/catalog']);
  }

  public goToMainPage() {
    this.router.navigate(['/']);
  }

  public onSearch({ target }: Event) {
    const str = (target as HTMLInputElement).value;
    const q = str !== '' ? str : undefined;

    this.router.navigate(['/catalog'], { queryParams: { q } });

  }

  public onClean() {
    console.log('clean')
    this.router.navigate(['/catalog']);
  }

}
