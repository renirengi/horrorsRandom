import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { FilmPageComponent } from './components/film-page/film-page.component';
import { MainComponent } from './components/main/main.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'user', component: UserPageComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'catalog/:id', component: FilmPageComponent },
  //{ path: 'users', component: AllUsersPageComponent },
  //{ path: 'users/:id', component:WatchUserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
