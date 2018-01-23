import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnOutOrderComponent } from './un-out-order.component';

describe('UnOutOrderComponent', () => {
  let component: UnOutOrderComponent;
  let fixture: ComponentFixture<UnOutOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnOutOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnOutOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
