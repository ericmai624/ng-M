import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  fetching: boolean;
  searchFocused: boolean;
  title: string;
  
  constructor() { 
    this.title = 'POPULAR';
    this.fetching = true;
  }
  
  ngOnInit() { }

  onFetchingMovies(fetching: boolean) {
    this.fetching = fetching;
  }

  onSearchFocus(focused: boolean) {
    this.searchFocused = focused;
  }

  onSearchSubmit(keyword: string) {

  }

}