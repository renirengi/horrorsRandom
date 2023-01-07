import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetoCollectionComponent } from './veto-collection.component';

describe('VetoCollectionComponent', () => {
  let component: VetoCollectionComponent;
  let fixture: ComponentFixture<VetoCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetoCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetoCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
