import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactSettingComponent} from './contact-setting.component';

describe('ContactSettingComponent', () => {
  let component: ContactSettingComponent;
  let fixture: ComponentFixture<ContactSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactSettingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
