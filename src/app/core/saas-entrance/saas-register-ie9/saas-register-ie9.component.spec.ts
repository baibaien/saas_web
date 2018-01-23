import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasRegisterIe9Component } from './saas-register-ie9.component';

describe('SaasRegisterIe9Component', () => {
  let component: SaasRegisterIe9Component;
  let fixture: ComponentFixture<SaasRegisterIe9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasRegisterIe9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasRegisterIe9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
