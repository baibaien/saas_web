import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSettingComponent } from './social-setting.component';

describe('SocialSettingComponent', () => {
  let component: SocialSettingComponent;
  let fixture: ComponentFixture<SocialSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
