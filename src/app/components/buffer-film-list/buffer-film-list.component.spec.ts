import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferFilmListComponent } from './buffer-film-list.component';

describe('BufferFilmListComponent', () => {
  let component: BufferFilmListComponent;
  let fixture: ComponentFixture<BufferFilmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BufferFilmListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BufferFilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
