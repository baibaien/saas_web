import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryBonusMComponent } from './salary-bonus-m.component';

describe('SalaryBonusMComponent', () => {
  let component: SalaryBonusMComponent;
  let fixture: ComponentFixture<SalaryBonusMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryBonusMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryBonusMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
