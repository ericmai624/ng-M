import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Config, MovieService } from '../components/movie/movie.service';

@Directive({
  selector: '[appProfileImage]'
})
export class ProfileImageDirective implements OnInit {
  @Input() path: string;
  @Input() style: object;

  constructor(private el:ElementRef, private movieService: MovieService) { }

  ngOnInit() {
    let img = new Image();
    img.alt = '';
    for (let prop in this.style) {
      img.style[prop] = this.style[prop];
    }
    this.el.nativeElement.append(img);

    if (!this.path) {
      this.el.nativeElement.style.background = 'rgb(219, 219, 219)'; // Overwrite background color
      img.src = '/assets/icons/icons8-customer-filled-96.png';
      return; // End of procedure
    }

    this.movieService.getTMDBConfig((config: Config) => {
      img.src = config.images.secure_base_url + config.images.profile_sizes[1] + this.path;
    });
  }
}
