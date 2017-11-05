import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) { }

  fetchMovies() {
   return this.http.get('http://localhost:8080/api/movies');
  }

}
