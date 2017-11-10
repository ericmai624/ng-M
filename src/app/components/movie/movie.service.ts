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

  fetchPoster(link: string) {
    return this.http.get(`${this.domain}/api/movies/poster?link=${link}`);    
  }

  fetchWithKeyword(keyword: string) {
    return this.http.get(`${this.domain}/api/movies/search?keyword=${keyword}`);
  }

}
