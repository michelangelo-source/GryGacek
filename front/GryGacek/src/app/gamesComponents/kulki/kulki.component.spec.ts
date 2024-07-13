import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KulkiComponent } from './kulki.component';

describe('KulkiComponent', () => {
  let component: KulkiComponent;
  let fixture: ComponentFixture<KulkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KulkiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KulkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
