import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCalcItemComponent } from './salary-calc-item.component';

describe('SalaryCalcItemComponent', () => {
  let component: SalaryCalcItemComponent;
  let fixture: ComponentFixture<SalaryCalcItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryCalcItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCalcItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
