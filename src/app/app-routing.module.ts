import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieDetailComponent } from './components/movie/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'movie/:name', component: MovieDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
