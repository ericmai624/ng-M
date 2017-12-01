import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input() ratings: object[];

  constructor() { }

  ngOnInit() { }

}
