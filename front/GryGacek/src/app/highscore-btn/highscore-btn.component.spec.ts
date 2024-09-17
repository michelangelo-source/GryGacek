import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreBtnComponent } from './highscore-btn.component';

describe('HigscoreBtnComponent', () => {
  let component: HighscoreBtnComponent;
  let fixture: ComponentFixture<HighscoreBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighscoreBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HighscoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
