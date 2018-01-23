import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDimissionComponent } from './staff-dimission.component';

describe('StaffDimissionComponent', () => {
  let component: StaffDimissionComponent;
  let fixture: ComponentFixture<StaffDimissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDimissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDimissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
