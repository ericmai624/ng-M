import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  movies: any;

  constructor(private movieService: MovieService) { }
  
  ngOnInit() { 
    this.movieService.fetchMovies().subscribe(
      data => {
        this.movies = data;
      },

      err => {
        console.log(err);
      }
    );
  }

}