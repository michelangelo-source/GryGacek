import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StttOnlineConfigComponent } from './sttt-online-config.component';

describe('StttOnlineConfigComponent', () => {
  let component: StttOnlineConfigComponent;
  let fixture: ComponentFixture<StttOnlineConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StttOnlineConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StttOnlineConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
