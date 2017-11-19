import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieDetailComponent } from './components/movie/movie-detail/movie-detail.component';

import { MovieDetailResolver } from './components/movie/movie-detail/movie-detail-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: HomepageComponent 
  },
  { 
    path: 'movie/:id/:name', 
    component: MovieDetailComponent, 
    resolve: { movie: MovieDetailResolver } 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ],
  providers:[MovieDetailResolver]
})
export class AppRoutingModule { }
