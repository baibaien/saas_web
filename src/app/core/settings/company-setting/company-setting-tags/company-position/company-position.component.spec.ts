import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPositionComponent } from './company-position.component';

describe('CompanyPositionComponent', () => {
  let component: CompanyPositionComponent;
  let fixture: ComponentFixture<CompanyPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
