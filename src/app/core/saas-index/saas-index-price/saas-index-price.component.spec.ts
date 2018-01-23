import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexPriceComponent } from './saas-index-price.component';

describe('SaasIndexPriceComponent', () => {
  let component: SaasIndexPriceComponent;
  let fixture: ComponentFixture<SaasIndexPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
