import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoresComponent } from './highscores.component';

describe('HighscoresComponent', () => {
  let component: HighscoresComponent;
  let fixture: ComponentFixture<HighscoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighscoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
