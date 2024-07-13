import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StttComponent } from './sttt.component';

describe('StttComponent', () => {
  let component: StttComponent;
  let fixture: ComponentFixture<StttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
