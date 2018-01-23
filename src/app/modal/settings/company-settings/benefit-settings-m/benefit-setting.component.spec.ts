import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitSettingComponent } from './benefit-setting.component';

describe('BenefitSettingComponent', () => {
  let component: BenefitSettingComponent;
  let fixture: ComponentFixture<BenefitSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
