import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffBatchUploadFailComponent } from './staff-batch-upload-fail.component';

describe('StaffBatchUploadFailComponent', () => {
  let component: StaffBatchUploadFailComponent;
  let fixture: ComponentFixture<StaffBatchUploadFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffBatchUploadFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffBatchUploadFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
