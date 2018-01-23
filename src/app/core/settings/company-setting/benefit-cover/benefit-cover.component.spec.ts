import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitCoverComponent } from './benefit-cover.component';

describe('BenefitCoverComponent', () => {
  let component: BenefitCoverComponent;
  let fixture: ComponentFixture<BenefitCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
