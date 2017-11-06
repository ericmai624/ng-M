import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEntryComponent } from './movie-entry.component';

describe('MovieEntryComponent', () => {
  let component: MovieEntryComponent;
  let fixture: ComponentFixture<MovieEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
