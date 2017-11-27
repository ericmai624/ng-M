import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieDetailComponent } from './components/movie/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component'

import { MovieDetailResolver } from './components/movie/movie-detail/movie-detail-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: HomepageComponent,
    children:[
      {
        path: '',
        component: MovieListComponent
      },
      {
        path: 'search/movie/:query',
        component: SearchResultsComponent
      }
    ]
  },
  { 
    path: 'movie/:id/:name', 
    component: MovieDetailComponent, 
    resolve: { movie: MovieDetailResolver }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ],
  providers:[MovieDetailResolver]
})
export class AppRoutingModule { }
