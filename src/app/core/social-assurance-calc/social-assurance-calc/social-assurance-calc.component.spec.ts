import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAssuranceCalcComponent } from './social-assurance-calc.component';

describe('SocialAssuranceCalcComponent', () => {
  let component: SocialAssuranceCalcComponent;
  let fixture: ComponentFixture<SocialAssuranceCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAssuranceCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAssuranceCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
