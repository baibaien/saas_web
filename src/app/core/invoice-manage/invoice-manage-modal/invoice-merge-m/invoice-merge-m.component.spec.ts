import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMergeMComponent } from './invoice-merge-m.component';

describe('InvoiceMergeMComponent', () => {
  let component: InvoiceMergeMComponent;
  let fixture: ComponentFixture<InvoiceMergeMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMergeMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMergeMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
