import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {
  dev: boolean;
  domain: string;
  fetchlab: string;

  constructor(private http: HttpClient) {
    this.dev = isDevMode();
    this.domain = this.dev ? 'http://localhost:8080' : ''; 
  }

  fetchMovies(page: number) {
    return this.http.get(`${this.domain}/api/movies?page=${page}`);
  }

  fetchMovieDetailById(id: string) {
    return this.http.get(`${this.domain}/api/movies/tmdb/movie/${id}`);
  }

  fetchWithKeyword(keyword: string) {
    return this.http.get(`${this.domain}/api/movies/tmdb/search?keyword=${keyword}`);
  }

  getRating(id: string) {
    return this.http.get(`${this.domain}/api/movies/rating/${id}`);
  }

  getTMDBConfig(callback) {
    let config: Config = JSON.parse(window.localStorage.getItem('tmdb_config'));
    if (!config || Date.now() - config['lastUpdate'] > 3 * 24 * 60 * 60 * 1000) {
      return this.http.get(`${this.domain}/api/movies/tmdb/config`).subscribe((data: Config) => {
        window.localStorage.setItem('tmdb_config', JSON.stringify(data));
        return callback(data);
      });
    } 
    return callback(config);
  }

  getBackdrop(background: string, poster: string) {
    return this.http.get(`${this.domain}/api/images?background=${background}&poster=${poster}`);
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
  credits: {
    cast: Cast[],
    crew: object[]
  };
  videos: {
    results: Video[]
  }
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
}

export class Cast {
  cast_id: number;
  character: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
  order: number;
  credit_id: string;
}

export class Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}
