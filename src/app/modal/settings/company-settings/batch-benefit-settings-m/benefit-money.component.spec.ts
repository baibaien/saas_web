import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitMoneyComponent } from './benefit-money.component';

describe('BenefitMoneyComponent', () => {
  let component: BenefitMoneyComponent;
  let fixture: ComponentFixture<BenefitMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
