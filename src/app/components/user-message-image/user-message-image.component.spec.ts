import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessageImageComponent } from './user-message-image.component';

describe('UserMessageImageComponent', () => {
  let component: UserMessageImageComponent;
  let fixture: ComponentFixture<UserMessageImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMessageImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMessageImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
