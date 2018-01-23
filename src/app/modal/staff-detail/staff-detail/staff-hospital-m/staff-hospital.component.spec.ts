import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHospitalComponent } from './staff-hospital.component';

describe('StaffHospitalComponent', () => {
  let component: StaffHospitalComponent;
  let fixture: ComponentFixture<StaffHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
