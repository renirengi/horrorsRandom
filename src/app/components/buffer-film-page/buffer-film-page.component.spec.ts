import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferFilmPageComponent } from './buffer-film-page.component';

describe('BufferFilmPageComponent', () => {
  let component: BufferFilmPageComponent;
  let fixture: ComponentFixture<BufferFilmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BufferFilmPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BufferFilmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
