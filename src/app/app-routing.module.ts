import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { FilmPageComponent } from './components/film-page/film-page.component';
import { MainComponent } from './components/main/main.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { FiltersResolverService } from './services/filters-resolver.service';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'user', component: UserPageComponent },
  {
    path: 'catalog',
    component: CatalogPageComponent,
    resolve: {
      filters: FiltersResolverService
    }
  },
  { path: 'catalog/:id', component: FilmPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
