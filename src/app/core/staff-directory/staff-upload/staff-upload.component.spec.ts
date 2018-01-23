import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUploadComponent } from './staff-upload.component';

describe('StaffUploadComponent', () => {
  let component: StaffUploadComponent;
  let fixture: ComponentFixture<StaffUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
