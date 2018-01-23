import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayExtendMComponent } from './holiday-extend-m.component';

describe('HolidayExtendMComponent', () => {
  let component: HolidayExtendMComponent;
  let fixture: ComponentFixture<HolidayExtendMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayExtendMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayExtendMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
