import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  input: string;

  constructor() {
    this.input = '';
  }

  ngOnInit() { }

  handleSearchInput(e: any) {
    if (e.which === 13) {
      return this.handleSearchSubmit();
    }
    this.input = e.target.value;
  }

  handleSearchSubmit() {
    console.log(this.input);
    this.resetInput();
  }

  resetInput() {
    this.input = '';
  }

}
