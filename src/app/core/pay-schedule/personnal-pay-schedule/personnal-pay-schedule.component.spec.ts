import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalPayScheduleComponent } from './personnal-pay-schedule.component';

describe('PersonnalPayScheduleComponent', () => {
  let component: PersonnalPayScheduleComponent;
  let fixture: ComponentFixture<PersonnalPayScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnalPayScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnalPayScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
