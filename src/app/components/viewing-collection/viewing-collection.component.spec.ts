import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingCollectionComponent } from './viewing-collection.component';

describe('ViewingCollectionComponent', () => {
  let component: ViewingCollectionComponent;
  let fixture: ComponentFixture<ViewingCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewingCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewingCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
