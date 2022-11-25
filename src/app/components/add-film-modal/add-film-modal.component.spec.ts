import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmModalComponent } from './add-film-modal.component';

describe('AddFilmModalComponent', () => {
  let component: AddFilmModalComponent;
  let fixture: ComponentFixture<AddFilmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilmModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
