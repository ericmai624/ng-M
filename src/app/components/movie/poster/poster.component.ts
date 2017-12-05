import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common';

import { Config, MovieService } from '../movie.service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {
  @Input() path: string;
  @Input() style: object;
  src: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    if (!this.path || this.path === '') {
      // Overwrite styles
      this.style['boxShadow'] = 'none';
      this.style['border'] = 'none';
      this.style['width'] = '100%';
      this.style['height'] = '100%';
      this.src = '/assets/icons/icons8-picture-96.png';      
      return;
    }

    this.movieService.getTMDBConfig((config: Config) => {
      this.src = config.images.secure_base_url + config.images.poster_sizes[4] + this.path;
    });
  }

}
