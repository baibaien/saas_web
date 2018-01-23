import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasRegisterComponent } from './saas-register.component';

describe('SaasRegisterComponent', () => {
  let component: SaasRegisterComponent;
  let fixture: ComponentFixture<SaasRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
