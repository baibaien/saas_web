import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourContractComponent } from './labour-contract.component';

describe('LabourContractComponent', () => {
  let component: LabourContractComponent;
  let fixture: ComponentFixture<LabourContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
