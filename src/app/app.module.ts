import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, enableProdMode } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';

import { MovieService } from './components/movie/movie.service';
import { MovieInfoComponent } from './components/movie/movie-info/movie-info.component';
import { environment } from '../environments/environment';
import { HomepageComponent } from './components/homepage/homepage.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'movie/:name', component: MovieInfoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    MovieListComponent,
    MovieInfoComponent,
    HomepageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
