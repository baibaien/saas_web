import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillManageComponent } from './bill-manage.component';

describe('BillManageComponent', () => {
  let component: BillManageComponent;
  let fixture: ComponentFixture<BillManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
