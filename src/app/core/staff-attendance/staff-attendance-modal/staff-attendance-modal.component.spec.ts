import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceModalComponent } from './staff-attendance-modal.component';

describe('StaffAttendanceModalComponent', () => {
  let component: StaffAttendanceModalComponent;
  let fixture: ComponentFixture<StaffAttendanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAttendanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAttendanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
