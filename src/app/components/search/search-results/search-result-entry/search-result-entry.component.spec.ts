import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultEntryComponent } from './search-result-entry.component';

describe('SearchResultEntryComponent', () => {
  let component: SearchResultEntryComponent;
  let fixture: ComponentFixture<SearchResultEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
