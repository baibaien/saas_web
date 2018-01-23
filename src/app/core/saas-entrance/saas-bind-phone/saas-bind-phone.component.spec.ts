import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasBindPhoneComponent } from './saas-bind-phone.component';

describe('SaasBindPhoneComponent', () => {
  let component: SaasBindPhoneComponent;
  let fixture: ComponentFixture<SaasBindPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasBindPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasBindPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
