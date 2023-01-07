import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRegistrationModalComponent } from './change-registration-modal.component';

describe('ChangeRegistrationModalComponent', () => {
  let component: ChangeRegistrationModalComponent;
  let fixture: ComponentFixture<ChangeRegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRegistrationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
