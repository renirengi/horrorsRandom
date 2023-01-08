import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetoButtonComponent } from './veto-button.component';

describe('VetoButtonComponent', () => {
  let component: VetoButtonComponent;
  let fixture: ComponentFixture<VetoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetoButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
