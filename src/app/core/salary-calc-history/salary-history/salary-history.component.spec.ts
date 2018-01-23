import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryHistoryComponent } from './salary-history.component';

describe('SalaryHistoryComponent', () => {
  let component: SalaryHistoryComponent;
  let fixture: ComponentFixture<SalaryHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
