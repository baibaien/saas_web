import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasServiceConfirmComponent } from './saas-service-confirm.component';

describe('SaasServiceConfirmComponent', () => {
  let component: SaasServiceConfirmComponent;
  let fixture: ComponentFixture<SaasServiceConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasServiceConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasServiceConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
