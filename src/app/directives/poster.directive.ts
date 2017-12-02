import { extend } from 'lodash';

import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { Config, MovieService } from '../components/movie/movie.service';

@Directive({
  selector: '[appPoster]'
})
export class PosterDirective implements OnInit {
  @Input() path: string;
  @Input() style: object;
  @Input() imgStyle: object;

  constructor(private el: ElementRef, private movieService: MovieService, private renderer: Renderer2) { }
  
  ngOnInit() {
    const defaultStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      background: 'rgba(0, 0, 0, 0.9)'
    };

    const customStyle = extend(defaultStyle, this.style || {}); // Copy component specific style to default style

    for (let prop in customStyle) {
      this.el.nativeElement.style[prop] = customStyle[prop];
    }

    let img = new Image();
    img.alt = '';
    this.el.nativeElement.append(img);

    if (!this.path) {
      // Overwrite style
      const { style } = this.el.nativeElement; 
      style.background = 'rgb(219, 219, 219)';
      img.src = '/assets/icons/icons8-picture-96.png';
      return; // End of procedure
    }

    this.movieService.getTMDBConfig((config: Config) => {
      img.src = config.images.secure_base_url + config.images.poster_sizes[4] + this.path;
      let imgStyle = this.imgStyle || {};
      for (let prop in imgStyle) {
        img.style[prop] = imgStyle[prop];
      }
      img.style.maxWidth = customStyle['width']; // parent width
      img.style.maxHeight = customStyle['height']; // parent height
    });
  }

}
