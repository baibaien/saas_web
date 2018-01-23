import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasPhonecheckComponent } from './saas-phonecheck.component';

describe('SaasPhonecheckComponent', () => {
  let component: SaasPhonecheckComponent;
  let fixture: ComponentFixture<SaasPhonecheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasPhonecheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasPhonecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
