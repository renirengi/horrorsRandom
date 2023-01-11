import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmTextReviewComponent } from './film-text-review.component';

describe('FilmTextReviewComponent', () => {
  let component: FilmTextReviewComponent;
  let fixture: ComponentFixture<FilmTextReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmTextReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmTextReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
