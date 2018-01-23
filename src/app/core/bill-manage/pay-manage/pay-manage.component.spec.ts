import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayManageComponent } from './pay-manage.component';

describe('PayManageComponent', () => {
  let component: PayManageComponent;
  let fixture: ComponentFixture<PayManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
