import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGeneralChangeResultMComponent } from './staff-general-change-result-m.component';

describe('StaffGeneralChangeResultMComponent', () => {
  let component: StaffGeneralChangeResultMComponent;
  let fixture: ComponentFixture<StaffGeneralChangeResultMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffGeneralChangeResultMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffGeneralChangeResultMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
