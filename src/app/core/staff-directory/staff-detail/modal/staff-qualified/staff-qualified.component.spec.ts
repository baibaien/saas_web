import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffQualifiedComponent } from './staff-qualified.component';

describe('StaffQualifiedComponent', () => {
  let component: StaffQualifiedComponent;
  let fixture: ComponentFixture<StaffQualifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffQualifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffQualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
