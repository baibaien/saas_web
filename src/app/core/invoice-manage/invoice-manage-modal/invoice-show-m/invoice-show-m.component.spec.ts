import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceShowMComponent } from './invoice-show-m.component';

describe('InvoiceShowMComponent', () => {
  let component: InvoiceShowMComponent;
  let fixture: ComponentFixture<InvoiceShowMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceShowMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceShowMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
