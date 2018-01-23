import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHolidayComponent } from './staff-holiday.component';

describe('StaffHolidayComponent', () => {
  let component: StaffHolidayComponent;
  let fixture: ComponentFixture<StaffHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
