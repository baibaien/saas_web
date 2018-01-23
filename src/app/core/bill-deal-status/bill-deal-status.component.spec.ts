import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDealStatusComponent } from './bill-deal-status.component';

describe('BillDealStatusComponent', () => {
  let component: BillDealStatusComponent;
  let fixture: ComponentFixture<BillDealStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDealStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDealStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
