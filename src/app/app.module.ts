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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
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
import { CatalogFiltersComponent } from './components/catalog-filters/catalog-filters.component';
import { CatalogFilterComponent } from './components/catalog-filter/catalog-filter.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { UserInformationModalComponent } from './components/user-information-modal/user-information-modal.component';
import { ChangeRegistrationModalComponent } from './components/change-registration-modal/change-registration-modal.component';
import { ViewingCollectionComponent } from './components/viewing-collection/viewing-collection.component';
import { VetoCollectionComponent } from './components/veto-collection/veto-collection.component';
import { VetoButtonComponent } from './components/veto-button/veto-button.component';
import { UserTextReviewComponent } from './components/user-text-review/user-text-review.component';
import { UsersReviewCountsComponent } from './components/users-review-counts/users-review-counts.component';
import { AddReviewModalComponent } from './components/add-review-modal/add-review-modal.component';
import { FilmTextReviewComponent } from './components/film-text-review/film-text-review.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { BufferFilmPageComponent } from './components/buffer-film-page/buffer-film-page.component';
import { BufferFilmListComponent } from './components/buffer-film-list/buffer-film-list.component';
import { BufferFilmCardComponent } from './components/buffer-film-card/buffer-film-card.component';
import { FixBufferModalComponent } from './components/fix-buffer-modal/fix-buffer-modal.component';
import { OtherUserPageComponent } from './components/other-user-page/other-user-page.component';
import { UserLinkComponent } from './components/user-link/user-link.component';
import { OwnMessagesComponent } from './components/own-messages/own-messages.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { MessageCardComponent } from './components/message-card/message-card.component';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { UserMessageImageComponent } from './components/user-message-image/user-message-image.component';
import { NewMessageModalComponent } from './components/new-message-modal/new-message-modal.component';


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
    SettingModalComponent,
    CatalogFiltersComponent,
    CatalogFilterComponent,
    RegisterModalComponent,
    UserInformationModalComponent,
    ChangeRegistrationModalComponent,
    ViewingCollectionComponent,
    VetoCollectionComponent,
    VetoButtonComponent,
    UserTextReviewComponent,
    UsersReviewCountsComponent,
    AddReviewModalComponent,
    FilmTextReviewComponent,
    AdminPageComponent,
    BufferFilmPageComponent,
    BufferFilmListComponent,
    BufferFilmCardComponent,
    FixBufferModalComponent,
    OtherUserPageComponent,
    UserLinkComponent,
    OwnMessagesComponent,
    MessagesListComponent,
    MessageCardComponent,
    MessagePageComponent,
    UserMessageImageComponent,
    NewMessageModalComponent,


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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
