import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryHistoryDetailComponent } from './salary-history-detail.component';

describe('SalaryHistoryDetailComponent', () => {
  let component: SalaryHistoryDetailComponent;
  let fixture: ComponentFixture<SalaryHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
