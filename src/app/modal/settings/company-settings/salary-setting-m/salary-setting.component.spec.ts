import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySettingComponent } from './salary-setting.component';

describe('SalarySettingComponent', () => {
  let component: SalarySettingComponent;
  let fixture: ComponentFixture<SalarySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
