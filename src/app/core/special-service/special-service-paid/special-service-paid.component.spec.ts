import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialServicePaidComponent } from './special-service-paid.component';

describe('SpecialServicePaidComponent', () => {
  let component: SpecialServicePaidComponent;
  let fixture: ComponentFixture<SpecialServicePaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialServicePaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialServicePaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
