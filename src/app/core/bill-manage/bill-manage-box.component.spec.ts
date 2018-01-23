import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillManageBoxComponent } from './bill-manage-box.component';

describe('BillManageBoxComponent', () => {
  let component: BillManageBoxComponent;
  let fixture: ComponentFixture<BillManageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillManageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillManageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
