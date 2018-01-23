import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSettingComponent } from './contract-setting.component';

describe('ContractSettingComponent', () => {
  let component: ContractSettingComponent;
  let fixture: ComponentFixture<ContractSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
