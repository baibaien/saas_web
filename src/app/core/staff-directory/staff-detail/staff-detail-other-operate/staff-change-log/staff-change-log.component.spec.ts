import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffChangeLogComponent } from './staff-change-log.component';

describe('StaffChangeLogComponent', () => {
  let component: StaffChangeLogComponent;
  let fixture: ComponentFixture<StaffChangeLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffChangeLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffChangeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
