import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationModalComponent } from './user-information-modal.component';

describe('UserInformationModalComponent', () => {
  let component: UserInformationModalComponent;
  let fixture: ComponentFixture<UserInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInformationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
