import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryOutsourcingComponent } from './salary-outsourcing.component';

describe('SalaryOutsourcingComponent', () => {
  let component: SalaryOutsourcingComponent;
  let fixture: ComponentFixture<SalaryOutsourcingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryOutsourcingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryOutsourcingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
