import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryOutsourcingModalComponent } from './salary-outsourcing-modal.component';

describe('SalaryOutsourcingModalComponent', () => {
  let component: SalaryOutsourcingModalComponent;
  let fixture: ComponentFixture<SalaryOutsourcingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryOutsourcingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryOutsourcingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
