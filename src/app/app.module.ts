import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule, enableProdMode } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';
import { MovieService } from './components/movie/movie.service';
import { MovieDetailComponent } from './components/movie/movie-detail/movie-detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';

import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    HomepageComponent,
    MovieListComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
