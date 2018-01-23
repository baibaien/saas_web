import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSettingComponent } from './fund-setting.component';

describe('FundSettingComponent', () => {
  let component: FundSettingComponent;
  let fixture: ComponentFixture<FundSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
