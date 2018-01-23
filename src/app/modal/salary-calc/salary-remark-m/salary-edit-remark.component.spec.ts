import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryEditRemarkComponent } from './salary-edit-remark.component';

describe('SalaryEditRemarkComponent', () => {
  let component: SalaryEditRemarkComponent;
  let fixture: ComponentFixture<SalaryEditRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryEditRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryEditRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
