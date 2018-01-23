import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGeneralFormalDateChangeMComponent } from './staff-general-formal-date-change-m.component';

describe('StaffGeneralFormalDateChangeMComponent', () => {
  let component: StaffGeneralFormalDateChangeMComponent;
  let fixture: ComponentFixture<StaffGeneralFormalDateChangeMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffGeneralFormalDateChangeMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffGeneralFormalDateChangeMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
