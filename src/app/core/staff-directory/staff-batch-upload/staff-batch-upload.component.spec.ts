import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffBatchUploadComponent } from './staff-batch-upload.component';

describe('StaffBatchUploadComponent', () => {
  let component: StaffBatchUploadComponent;
  let fixture: ComponentFixture<StaffBatchUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffBatchUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffBatchUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
