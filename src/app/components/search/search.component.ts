import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
