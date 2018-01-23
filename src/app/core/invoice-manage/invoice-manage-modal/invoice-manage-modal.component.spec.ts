import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceManageModalComponent } from './invoice-manage-modal.component';

describe('InvoiceManageModalComponent', () => {
  let component: InvoiceManageModalComponent;
  let fixture: ComponentFixture<InvoiceManageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
