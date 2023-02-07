import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { BufferFilmPageComponent } from './components/buffer-film-page/buffer-film-page.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { FilmPageComponent } from './components/film-page/film-page.component';
import { MainComponent } from './components/main/main.component';
import { OtherUserPageComponent } from './components/other-user-page/other-user-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { FiltersResolverService } from './services/filters-resolver.service';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'user', component: UserPageComponent },
  { path: 'user/:id', component: OtherUserPageComponent },
  {
    path: 'catalog',
    component: CatalogPageComponent,
    resolve: {
      filters: FiltersResolverService
    }
  },
  { path: 'catalog/:id', component: FilmPageComponent },
  { path: 'admin/:id', component: BufferFilmPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuardGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
