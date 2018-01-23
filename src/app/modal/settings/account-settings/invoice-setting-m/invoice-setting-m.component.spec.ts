import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSettingMComponent } from './invoice-setting-m.component';

describe('InvoiceSettingMComponent', () => {
  let component: InvoiceSettingMComponent;
  let fixture: ComponentFixture<InvoiceSettingMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSettingMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSettingMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
