import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUncompletedComponent } from './staff-uncompleted.component';

describe('StaffUncompletedComponent', () => {
  let component: StaffUncompletedComponent;
  let fixture: ComponentFixture<StaffUncompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffUncompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUncompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
