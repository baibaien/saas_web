import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAddInfoComponent } from './staff-add-info.component';

describe('StaffAddInfoComponent', () => {
  let component: StaffAddInfoComponent;
  let fixture: ComponentFixture<StaffAddInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAddInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAddInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
