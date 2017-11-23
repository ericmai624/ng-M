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

  fetchMovies() {
    return this.http.get(`${this.domain}/api/movies`);
  }

  fetchMovieDetailById(id: string) {
    return this.http.get(`${this.domain}/api/movies/tmdb/movie/${id}`);
  }

  fetchWithKeyword(keyword: string) {
    return this.http.get(`${this.domain}/api/movies/tmdb/search?keyword=${keyword}`);
  }

  fetchDouBanRating(id: string) {
    return this.http.get(`${this.domain}/api/movies/douban/${id}`);
  }

  fetchOMDBDetail(id: string) {
    return this.http.get(`${this.domain}/api/movies/omdb/${id}`);
  }

  getTMDBConfig() {
    return this.http.get(`${this.domain}/api/movies/tmdb/config`);
  }

  updateUrl(title) {
    let result = '';

    for (let i = 0; i < title.length; i++) {
      if (result[result.length - 1] === ':') {
        result += title[i].match(/\s/) ? '' : title[i].toLowerCase();
      } else {
        result += title[i].match(/\s/) ? '-' : title[i].toLowerCase();
      }
    }

    return result;
  }

}

// TMDB Movie Detail Obj
export class Movie {
  vote_count: number;
  vote_average: number;
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
  tagline: string;
  status: string;

  constructor() { }
}


// TMDB Image Config
export class Config {
  images: {
    base_url: string,
    secure_base_url: string,
    backdrop_sizes: string[],
    logo_sizes: string[],
    poster_sizes: string[],
    profile_sizes: string[],
    still_sizes: string[]
  };
  change_keys: string[];

  constructor() { }
}
