import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrWorkCalendarComponent } from './mayihr-work-calendar.component';

describe('MayihrWorkCalendarComponent', () => {
  let component: MayihrWorkCalendarComponent;
  let fixture: ComponentFixture<MayihrWorkCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrWorkCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrWorkCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
