import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnMessagesComponent } from './own-messages.component';

describe('OwnMessagesComponent', () => {
  let component: OwnMessagesComponent;
  let fixture: ComponentFixture<OwnMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
