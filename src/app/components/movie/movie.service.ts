import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {
  dev: boolean;
  domain: string;

  constructor(private http: HttpClient) {
    this.dev = isDevMode();
    this.domain = this.dev ? 'http://localhost:8080' : ''; 
  }

  fetchMovieDetailById(id: string) {
    return this.http.get(`${this.domain}/api/movies/${id}`);
  }

  fetchMovies() {
    return this.http.get(`${this.domain}/api/movies`);
  }

  fetchImage(link: string, type: string) {
    return this.http.get(`${this.domain}/api/movies/image?link=${link}&type=${type}`);    
  }

  fetchWithKeyword(keyword: string) {
    return this.http.get(`${this.domain}/api/movies/search?keyword=${keyword}`);
  }

}

export class Movie {
  vote_count: number;
  id: number;
  video: boolean;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  imdb_id: string;
  production_companies: object[];
  production_countries: object[];
  revenue: number;
  runtime: number;
  spoken_languages: object[];
  vote_average: number;
  tagline: string;
  status: string;

  constructor() { }
}
