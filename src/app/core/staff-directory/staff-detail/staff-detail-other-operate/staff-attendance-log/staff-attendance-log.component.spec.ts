import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceLogComponent } from './staff-attendance-log.component';

describe('StaffAttendanceLogComponent', () => {
  let component: StaffAttendanceLogComponent;
  let fixture: ComponentFixture<StaffAttendanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAttendanceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAttendanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
