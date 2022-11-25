import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { IFilm } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services/film.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.scss']
})
export class SettingModalComponent implements OnInit {
  public tags$: Observable<string[]>;
  public settingForm = new FormGroup({
    tag: new FormControl('')});

  constructor(
    private filmService: FilmService,
    public dialogRef: MatDialogRef<SettingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string [],

  ) {
    this.tags$ = this.filmService.getAvailable('genres');
   }

  ngOnInit(): void {
  }

  getValue() {

  }

}
