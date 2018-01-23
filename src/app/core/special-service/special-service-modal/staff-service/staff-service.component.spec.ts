import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffServiceComponent } from './staff-service.component';

describe('StaffServiceComponent', () => {
  let component: StaffServiceComponent;
  let fixture: ComponentFixture<StaffServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
