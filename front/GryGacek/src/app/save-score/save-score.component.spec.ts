import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveScoreComponent } from './save-score.component';

describe('SaveScoreComponent', () => {
  let component: SaveScoreComponent;
  let fixture: ComponentFixture<SaveScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
