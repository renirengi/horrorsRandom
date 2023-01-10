import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReviewCountsComponent } from './users-review-counts.component';

describe('UsersReviewCountsComponent', () => {
  let component: UsersReviewCountsComponent;
  let fixture: ComponentFixture<UsersReviewCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersReviewCountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersReviewCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
