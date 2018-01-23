import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SendSettingComponent} from './send-setting.component';

describe('SendSettingComponent', () => {
  let component: SendSettingComponent;
  let fixture: ComponentFixture<SendSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendSettingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
