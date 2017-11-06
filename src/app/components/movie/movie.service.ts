import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) { }

  fetchMovies() {
    const domain = true ? 'http://localhost:8080' : '';
    return this.http.get(`${domain}/api/movies`);
  }

  fetchPoster(url) {
    return this.http.get(`http://localhost:8080/api/movies/poster?url=${url}`);
  }

}
