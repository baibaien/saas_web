import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitOutOrderComponent } from './wait-out-order.component';

describe('WaitOutOrderComponent', () => {
  let component: WaitOutOrderComponent;
  let fixture: ComponentFixture<WaitOutOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitOutOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitOutOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
