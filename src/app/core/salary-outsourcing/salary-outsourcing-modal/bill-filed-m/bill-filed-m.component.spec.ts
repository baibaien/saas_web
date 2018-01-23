import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFiledMComponent } from './bill-filed-m.component';

describe('BillFiledMComponent', () => {
  let component: BillFiledMComponent;
  let fixture: ComponentFixture<BillFiledMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillFiledMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillFiledMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
