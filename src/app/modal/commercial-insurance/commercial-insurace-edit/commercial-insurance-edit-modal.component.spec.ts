import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialInsuranceEditModalComponent } from './commercial-insurance-edit-modal.component';

describe('CommercialInsuranceEditModalComponent', () => {
  let component: CommercialInsuranceEditModalComponent;
  let fixture: ComponentFixture<CommercialInsuranceEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialInsuranceEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialInsuranceEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
