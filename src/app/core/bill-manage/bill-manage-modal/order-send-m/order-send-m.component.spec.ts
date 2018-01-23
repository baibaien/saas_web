import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSendMComponent } from './order-send-m.component';

describe('OrderSendMComponent', () => {
  let component: OrderSendMComponent;
  let fixture: ComponentFixture<OrderSendMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSendMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSendMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
