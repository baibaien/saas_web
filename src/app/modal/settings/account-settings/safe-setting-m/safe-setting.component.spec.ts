import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SafeSettingComponent} from './safe-setting.component';

describe('SafeSettingComponent', () => {
  let component: SafeSettingComponent;
  let fixture: ComponentFixture<SafeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafeSettingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
