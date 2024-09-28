import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StttMenuComponent } from './sttt-menu.component';

describe('StttMenuComponent', () => {
  let component: StttMenuComponent;
  let fixture: ComponentFixture<StttMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StttMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StttMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
