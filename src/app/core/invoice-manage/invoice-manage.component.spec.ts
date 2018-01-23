import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceManageComponent } from './invoice-manage.component';

describe('InvoiceManageComponent', () => {
  let component: InvoiceManageComponent;
  let fixture: ComponentFixture<InvoiceManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
