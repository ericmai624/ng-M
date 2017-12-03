import { Component, OnInit, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import {
  animate,
  trigger,
  state,
  style,
  transition
} from '@angular/animations';

import { Config, MovieService } from '../../movie.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
  animations: [
    trigger('curtain', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 100
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ]),
    trigger('bg', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 100
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class BackgroundComponent implements OnInit {
  @Input() background: string;
  @Input() poster: string;
  state: string;
  bg: object;
  curtain: object;

  constructor(private movieService: MovieService) { 
    this.state = 'inactive';
  }

  ngOnInit() {
    if (!this.background || !this.poster) {
      const backgroundImage = 'radial-gradient(circle at 20% 50%, rgba(43.33%, 43.33%, 43.33%, 0.94) 0%, rgba(63.33%, 63.33%, 63.33%, 0.94) 100%)';
      this.curtain = { backgroundImage };
      return this.toggleState();
    }

    this.movieService.getBackdrop(this.background, this.poster).subscribe((data) => {
      const outter = data['palette']['outter'];
      const circle = data['palette']['circle'];

      for (let i = 0; i < 3; i++) {
        outter[i]  *= (80 / 255);
        circle[i] *= (80 / 255);
      }

      const circleRgb = `rgba(${circle[0]}%, ${circle[1]}%, ${circle[2]}%, 0.94)`;
      const outterRgb = `rgba(${outter[0]}%, ${outter[1]}%, ${outter[2]}%, 0.94)`;

      this.bg = { backgroundImage: `url(${data['bg']})` };
      this.curtain = { backgroundImage : `radial-gradient(circle at 20% 50%, ${circleRgb} 0%, ${outterRgb} 100%)` };
      this.toggleState();
    });
  }

  toggleState() {
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }

}
