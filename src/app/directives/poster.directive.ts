import { extend } from 'lodash';

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
    const defaultStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.9)'
    };

    const customStyle = extend(defaultStyle, this.style || {}); // Copy component specific style to default style

    for (let prop in customStyle) {
      this.el.nativeElement.style[prop] = customStyle[prop];
    }

    let img = new Image();
    let imgStyle = this.imgStyle || {};
    for (let prop in imgStyle) {
      img.style[prop] = imgStyle[prop];
    }
    img.style.maxWidth = customStyle['width']; // parent width
    img.alt = '';
    this.el.nativeElement.append(img);

    if (!this.path) {
      this.el.nativeElement.style.background = 'rgb(219, 219, 219)'; // Overwrite background color
      img.src = '/assets/icons/icons8-picture-96.png';
      return; // End of procedure
    }

    let config: Config = JSON.parse(window.localStorage.getItem('tmdb_config'));
    if (!config || Date.now() - config['lastUpdate'] > 3 * 24 * 60 * 60 * 1000) {
      this.movieService.getTMDBConfig().subscribe((response: Config) => {
        window.localStorage.setItem('tmdb_config', JSON.stringify(response));
        img.src = response.images.secure_base_url + response.images.poster_sizes[4] + this.path;
      });
    } else {
      img.src = config.images.secure_base_url + config.images.poster_sizes[4] + this.path;      
    }
  }

}
