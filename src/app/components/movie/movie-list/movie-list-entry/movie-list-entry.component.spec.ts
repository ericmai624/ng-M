import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListEntryComponent } from './movie-list-entry.component';

describe('MovieListEntryComponent', () => {
  let component: MovieListEntryComponent;
  let fixture: ComponentFixture<MovieListEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
