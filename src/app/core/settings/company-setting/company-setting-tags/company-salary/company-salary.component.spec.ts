import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySalaryComponent } from './company-salary.component';

describe('CompanySalaryComponent', () => {
  let component: CompanySalaryComponent;
  let fixture: ComponentFixture<CompanySalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
