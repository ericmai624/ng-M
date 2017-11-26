import _ from 'lodash';

import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Config, MovieService } from '../components/movie/movie.service';


@Directive({
  selector: '[appPoster]'
})
export class PosterDirective implements OnInit {
  @Input() path: string;
  @Input() style: object;
  @Input() imgStyle: object;

  constructor(private el: ElementRef, private movieService: MovieService) { }
  
  ngOnInit() {
    _.extend(this.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });
    for (let prop in this.style) {
      this.el.nativeElement.style[prop] = this.style[prop];
    }

    let img = new Image();
    let imgStyle = this.imgStyle || {};
    for (let prop in imgStyle) {
      img.style[prop] = imgStyle[prop];
    }
    img.style.maxWidth = this.style['width']; // parent width
    img.alt = '';
    this.el.nativeElement.append(img);

    if (!this.path) {
      img.src = '/assets/icons/icons8-picture-96.png';
      return;
    }
    let config: Config = JSON.parse(window.localStorage.getItem('tmdb_baseurl'));
    if (!config) {
      this.movieService.getTMDBConfig().subscribe((data: Config) => {
        window.localStorage.setItem('tmdb_baseurl', JSON.stringify(data));
        config = data;
      });
    }
    img.src = config.images.secure_base_url + config.images.poster_sizes[4] + this.path;
  }

}
