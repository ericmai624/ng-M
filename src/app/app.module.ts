import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule, enableProdMode } from '@angular/core';

import { AppRoutingModule } from './/app-routing.module';

import { CanvasCircleRatingDirective } from './directives/canvas-circle-rating.directive';
import { MultilineEllipsisDirective } from './directives/multiline-ellipsis.directive';
import { ProfileImageDirective } from './directives/profile-image.directive';
import { AutoResizeDirective } from './directives/auto-resize.directive';

import { MovieRouterlinkPipe } from './pipes/movie-routerlink.pipe';

import { MovieService } from './components/movie/movie.service';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie/movie-detail/movie-detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieListEntryComponent } from './components/movie/movie-list/movie-list-entry/movie-list-entry.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SearchResultEntryComponent } from './components/search/search-results/search-result-entry/search-result-entry.component';
import { RatingsComponent } from './components/movie/ratings/ratings.component';
import { CastComponent } from './components/movie/movie-detail/cast/cast.component';
import { PosterComponent } from './components/movie/poster/poster.component';
import { BackgroundComponent } from './components/movie/movie-detail/background/background.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    HomepageComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieListEntryComponent,
    SearchResultsComponent,
    SearchResultEntryComponent,
    CanvasCircleRatingDirective,
    MultilineEllipsisDirective,
    MovieRouterlinkPipe,
    RatingsComponent,
    CastComponent,
    ProfileImageDirective,
    AutoResizeDirective,
    PosterComponent,
    BackgroundComponent
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
