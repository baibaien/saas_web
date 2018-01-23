import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGeneralChangeComponent } from './staff-general-change.component';

describe('StaffGeneralChangeComponent', () => {
  let component: StaffGeneralChangeComponent;
  let fixture: ComponentFixture<StaffGeneralChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffGeneralChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffGeneralChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
