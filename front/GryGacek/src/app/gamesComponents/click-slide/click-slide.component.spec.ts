import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickSlideComponent } from './click-slide.component';

describe('ClickSlideComponent', () => {
  let component: ClickSlideComponent;
  let fixture: ComponentFixture<ClickSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
