import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Movie, Config, MovieService } from '../../../movie/movie.service';

@Component({
  selector: 'app-search-result-entry',
  templateUrl: './search-result-entry.component.html',
  styleUrls: ['./search-result-entry.component.css']
})
export class SearchResultEntryComponent implements OnInit {
  @Input() movie: Movie;
  @ViewChild('overview') overview: ElementRef;
  urlTitle: string;
  poster: string;
  overviewArr: string[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.urlTitle = this.movieService.updateUrl(this.movie.title);
    this.posterUrl(this.movie.poster_path);
    this.overviewArr = this.movie.overview.split(' ');
  }

  ngAfterViewInit() {
    // console.log(this.overview.nativeElement.clientHeight);
    // this.clamp(86.5);
  }

  posterUrl(link: string): void {
    if (!link) { return; }
    let config: Config = JSON.parse(window.localStorage.getItem('tmdb_baseurl'));
    if (!config) {
      this.movieService.getTMDBConfig().subscribe((data: Config) => {
        window.localStorage.setItem('tmdb_baseurl', JSON.stringify(data));
        config = data;
      });
    }
    this.poster = config.images.secure_base_url + config.images.poster_sizes[4] + link;
  }

  clamp(maxHeight): void {
    // while (this.overview.nativeElement.offsetHeight >= maxHeight) {
    //   this.overviewArr.pop();
    //   this.overview.textContent = this.overviewArr.join(' ') + '...';
    // }
  }

}
