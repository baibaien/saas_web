import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasLoginComponent } from './saas-login.component';

describe('SaasLoginComponent', () => {
  let component: SaasLoginComponent;
  let fixture: ComponentFixture<SaasLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
