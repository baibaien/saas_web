import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrImgUploadComponent } from './mayihr-img-upload.component';

describe('MayihrImgUploadComponent', () => {
  let component: MayihrImgUploadComponent;
  let fixture: ComponentFixture<MayihrImgUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrImgUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
