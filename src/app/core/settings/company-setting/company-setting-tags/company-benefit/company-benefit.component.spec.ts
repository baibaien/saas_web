import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBenefitComponent } from './company-benefit.component';

describe('CompanyBenefitComponent', () => {
  let component: CompanyBenefitComponent;
  let fixture: ComponentFixture<CompanyBenefitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBenefitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
