import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFundComponent } from './company-fund.component';

describe('CompanyFundComponent', () => {
  let component: CompanyFundComponent;
  let fixture: ComponentFixture<CompanyFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
