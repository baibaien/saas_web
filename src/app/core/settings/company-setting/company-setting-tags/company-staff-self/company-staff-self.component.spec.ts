import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStaffSelfComponent } from './company-staff-self.component';

describe('CompanyStaffSelfComponent', () => {
  let component: CompanyStaffSelfComponent;
  let fixture: ComponentFixture<CompanyStaffSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStaffSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStaffSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
