import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUploadPositionUpdateMComponent } from './staff-upload-position-update-m.component';

describe('StaffUploadPositionUpdateMComponent', () => {
  let component: StaffUploadPositionUpdateMComponent;
  let fixture: ComponentFixture<StaffUploadPositionUpdateMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffUploadPositionUpdateMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUploadPositionUpdateMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
