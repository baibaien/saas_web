import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidBillComponent } from './paid-bill.component';

describe('PaidBillComponent', () => {
  let component: PaidBillComponent;
  let fixture: ComponentFixture<PaidBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
