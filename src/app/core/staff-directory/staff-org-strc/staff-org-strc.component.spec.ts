import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffOrgStrcComponent } from './staff-org-strc.component';

describe('StaffOrgStrcComponent', () => {
  let component: StaffOrgStrcComponent;
  let fixture: ComponentFixture<StaffOrgStrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffOrgStrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffOrgStrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
