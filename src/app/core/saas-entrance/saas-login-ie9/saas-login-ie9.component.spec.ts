import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasLoginIe9Component } from './saas-login-ie9.component';

describe('SaasLoginIe9Component', () => {
  let component: SaasLoginIe9Component;
  let fixture: ComponentFixture<SaasLoginIe9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasLoginIe9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasLoginIe9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
