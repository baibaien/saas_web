import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidBillComponent } from './unpaid-bill.component';

describe('UnpaidBillComponent', () => {
  let component: UnpaidBillComponent;
  let fixture: ComponentFixture<UnpaidBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
