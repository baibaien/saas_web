import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingTagsComponent } from './account-setting-tags.component';

describe('AccountSettingTagsComponent', () => {
  let component: AccountSettingTagsComponent;
  let fixture: ComponentFixture<AccountSettingTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
