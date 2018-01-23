import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailMComponent } from './bill-detail-m.component';

describe('BillDetailMComponent', () => {
  let component: BillDetailMComponent;
  let fixture: ComponentFixture<BillDetailMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDetailMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
