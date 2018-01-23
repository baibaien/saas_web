import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexProductSaasComponent } from './saas-index-product-saas.component';

describe('SaasIndexProductSaasComponent', () => {
  let component: SaasIndexProductSaasComponent;
  let fixture: ComponentFixture<SaasIndexProductSaasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexProductSaasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexProductSaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
