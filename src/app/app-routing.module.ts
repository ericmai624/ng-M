import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieInfoComponent } from './components/movie/movie-info/movie-info.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'movies/:name', component: MovieInfoComponent }
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
