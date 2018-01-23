import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceChangeComponent } from './attendance-change.component';

describe('AttendanceChangeComponent', () => {
  let component: AttendanceChangeComponent;
  let fixture: ComponentFixture<AttendanceChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
