import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsFapiaoTagsComponent } from './account-settings-fapiao-tags.component';

describe('AccountSettingsFapiaoTagsComponent', () => {
  let component: AccountSettingsFapiaoTagsComponent;
  let fixture: ComponentFixture<AccountSettingsFapiaoTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsFapiaoTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsFapiaoTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
