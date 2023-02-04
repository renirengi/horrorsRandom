import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferFilmCardComponent } from './buffer-film-card.component';

describe('BufferFilmCardComponent', () => {
  let component: BufferFilmCardComponent;
  let fixture: ComponentFixture<BufferFilmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BufferFilmCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BufferFilmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
