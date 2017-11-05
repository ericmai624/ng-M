import { Component } from '@angular/core';
import { MovieService } from './components/movie/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies: any[];

  constructor(movieService: MovieService) {
    movieService.fetchMovies().subscribe(
      data => {
        this.movies = data['subjects'];
      },

      err => {
        console.log(err);
      }
    );
  }
}
