import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTextReviewComponent } from './user-text-review.component';

describe('UserTextReviewComponent', () => {
  let component: UserTextReviewComponent;
  let fixture: ComponentFixture<UserTextReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTextReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTextReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
