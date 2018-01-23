import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDeletFormComponent } from './staff-delet-form.component';

describe('StaffDeletFormComponent', () => {
  let component: StaffDeletFormComponent;
  let fixture: ComponentFixture<StaffDeletFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDeletFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDeletFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
