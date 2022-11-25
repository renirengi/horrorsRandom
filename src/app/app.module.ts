import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilmPageComponent } from './components/film-page/film-page.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { MovieRatingComponent } from './components/movie-rating/movie-rating.component';
import { AddFilmModalComponent } from './components/add-film-modal/add-film-modal.component';
import { UserRatingComponent } from './components/user-rating/user-rating.component';
import { SettingModalComponent } from './components/setting-modal/setting-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    UserPageComponent,
    CatalogPageComponent,
    FilmPageComponent,
    LoginModalComponent,
    FilmsListComponent,
    FilmCardComponent,
    MovieRatingComponent,
    AddFilmModalComponent,
    UserRatingComponent,
    SettingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
