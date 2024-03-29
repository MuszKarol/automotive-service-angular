import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsComponent } from './visits.component';

describe('ReservationsComponent', () => {
  let component: VisitsComponent;
  let fixture: ComponentFixture<VisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
