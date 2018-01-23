import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsSendTagsComponent } from './account-settings-send-tags.component';

describe('AccountSettingsSendTagsComponent', () => {
  let component: AccountSettingsSendTagsComponent;
  let fixture: ComponentFixture<AccountSettingsSendTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsSendTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsSendTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
