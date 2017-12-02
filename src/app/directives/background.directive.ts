import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Config, MovieService } from '../components/movie/movie.service';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit {
  @Input() backgroundPath: string;
  @Input() posterPath: string;

  constructor(private el: ElementRef, private movieService: MovieService) { }

  ngOnInit() {
    if (!this.backgroundPath) {
      this.el.nativeElement.style.background = 'rgba(64, 64, 64, 0.8)';
      return;
    }

    // this.movieService.getTMDBConfig((config) => {
    //   const image = config.images.secure_base_url + config.images.backdrop_sizes[2] + this.path;
    //   this.el.nativeElement.style.backgroundImage = `url(${image})`;
    // });
  }

}
