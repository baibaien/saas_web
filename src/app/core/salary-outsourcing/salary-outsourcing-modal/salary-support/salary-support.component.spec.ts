import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySupportComponent } from './salary-support.component';

describe('SalarySupportComponent', () => {
  let component: SalarySupportComponent;
  let fixture: ComponentFixture<SalarySupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarySupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
