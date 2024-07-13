import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ttt3dComponent } from './ttt3d.component';

describe('Ttt3dComponent', () => {
  let component: Ttt3dComponent;
  let fixture: ComponentFixture<Ttt3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ttt3dComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ttt3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
