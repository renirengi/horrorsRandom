import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesButtonsBoxComponent } from './messages-buttons-box.component';

describe('MessagesButtonsBoxComponent', () => {
  let component: MessagesButtonsBoxComponent;
  let fixture: ComponentFixture<MessagesButtonsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesButtonsBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesButtonsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
