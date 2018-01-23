import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceAdjustMComponent } from './attendance-adjust-m.component';

describe('AttendanceAdjustMComponent', () => {
  let component: AttendanceAdjustMComponent;
  let fixture: ComponentFixture<AttendanceAdjustMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceAdjustMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceAdjustMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
