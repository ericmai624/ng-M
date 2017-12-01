import { Component, OnInit, Input } from '@angular/core';

import  { Cast } from '../../movie.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
  @Input() cast: Cast;
  profileImgStyle: object = {};  

  constructor() { 
    this.profileImgStyle['maxWidth'] = '150px';
  }

  ngOnInit() {
  }

}
