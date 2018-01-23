import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsContactTagsComponent } from './account-settings-contact-tags.component';

describe('AccountSettingsContactTagsComponent', () => {
  let component: AccountSettingsContactTagsComponent;
  let fixture: ComponentFixture<AccountSettingsContactTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsContactTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsContactTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
