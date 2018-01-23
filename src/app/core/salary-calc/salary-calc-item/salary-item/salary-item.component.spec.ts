import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryItemComponent } from './salary-item.component';

describe('SalaryItemComponent', () => {
  let component: SalaryItemComponent;
  let fixture: ComponentFixture<SalaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
