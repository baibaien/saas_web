import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasAuthorizeComponent } from './saas-authorize.component';

describe('SaasAuthorizeComponent', () => {
  let component: SaasAuthorizeComponent;
  let fixture: ComponentFixture<SaasAuthorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasAuthorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
