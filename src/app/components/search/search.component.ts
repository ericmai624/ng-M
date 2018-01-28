import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  input: string;
  @Output() onSearchFocus: EventEmitter<boolean>;
  @Output() onSearchSubmit: EventEmitter<string>;

  constructor() { 
    this.input = '';
    this.onSearchFocus = new EventEmitter();
    this.onSearchSubmit = new EventEmitter();
  }

  ngOnInit() { }

  /* Focus and Blur is not used here, reserved for future use */
  handleSearchFocus() {
    this.onSearchFocus.emit(true);
  }

  handleSearchBlur() {
    this.onSearchFocus.emit(false);
  }

  handleSearchInput(value: string) {
    this.input = value;
  }

  handleSearchSubmit() {
    this.onSearchSubmit.emit(this.input);
  }

}
