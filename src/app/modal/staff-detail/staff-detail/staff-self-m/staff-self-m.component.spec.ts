import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSelfMComponent } from './staff-self-m.component';

describe('StaffSelfMComponent', () => {
  let component: StaffSelfMComponent;
  let fixture: ComponentFixture<StaffSelfMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSelfMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSelfMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
