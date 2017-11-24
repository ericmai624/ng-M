import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Config, MovieService } from '../components/movie/movie.service';

@Directive({
  selector: '[appBackdrop]'
})
export class BackdropDirective implements OnInit {
  @Input() path: string;

  constructor(private el: ElementRef, private movieService: MovieService) { }

  ngOnInit() {
    if (!this.path) {
      return;
    }   
    let config: Config = JSON.parse(window.localStorage.getItem('tmdb_baseurl'));
    if (!config) {
      this.movieService.getTMDBConfig().subscribe((data: Config) => {
        window.localStorage.setItem('tmdb_baseurl', JSON.stringify(data));
        config = data;
      });
    }
    const url = config.images.secure_base_url + config.images.backdrop_sizes[2] + this.path;
    this.el.nativeElement.style.backgroundImage = `url(${url})`;
  }

}
