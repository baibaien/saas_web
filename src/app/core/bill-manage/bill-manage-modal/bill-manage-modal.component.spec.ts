import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillManageModalComponent } from './bill-manage-modal.component';

describe('BillManageModalComponent', () => {
  let component: BillManageModalComponent;
  let fixture: ComponentFixture<BillManageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillManageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
