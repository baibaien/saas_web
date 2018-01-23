import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexProductSystemComponent } from './saas-index-product-system.component';

describe('SaasIndexProductSystemComponent', () => {
  let component: SaasIndexProductSystemComponent;
  let fixture: ComponentFixture<SaasIndexProductSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexProductSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexProductSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
