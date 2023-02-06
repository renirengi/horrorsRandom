import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixBufferModalComponent } from './fix-buffer-modal.component';

describe('FixBufferModalComponent', () => {
  let component: FixBufferModalComponent;
  let fixture: ComponentFixture<FixBufferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixBufferModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixBufferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
