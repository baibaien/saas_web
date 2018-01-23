import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsSafeTagsComponent } from './account-settings-safe-tags.component';

describe('AccountSettingsSafeTagsComponent', () => {
  let component: AccountSettingsSafeTagsComponent;
  let fixture: ComponentFixture<AccountSettingsSafeTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsSafeTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsSafeTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
